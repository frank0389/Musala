import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authApi from "../apis/auth";
import {ACCESS_TOKEN} from "../utils/constants";
import handleError from "../utils/handle-error";
import {setLocale} from "./locale";

 const initialState = {
    status: 'idle',  //'idle','loading','succeeded','failed'
    error: null, // Errors returned from server side
    account: null ,// Current user account
};

// Async Actions
export const getAccount = createAsyncThunk('authentication/get_account',
    async ( args,{ rejectWithValue }) => {
    try {
        const response =  await authApi.account();
        return response;
    } catch (error){
        return rejectWithValue(handleError(error));
    }
});

export const authenticate = createAsyncThunk(
    'authentication/login', async (params,{ rejectWithValue }) => {
        try {
            const response = await authApi.auth(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });


//Thunk action
export const getSession = () => async (dispatch,getState) => {
    const response =  await dispatch(getAccount()); //const accountAction =
    const { account } = getState().authentication;
    if (account && account.langKey) {
        dispatch(setLocale(account.langKey));
    }
};


//Thunk action
export const login =  (username, password, rememberMe) =>
        async dispatch => {
            const result = await dispatch(authenticate({ username, password, rememberMe }));
            const response = result.payload;
            const jwt = response?.data?.id_token;

            if (jwt) {
                if (rememberMe) {
                    localStorage.setItem(ACCESS_TOKEN, jwt);
                } else {
                    sessionStorage.setItem(ACCESS_TOKEN, jwt);
                }
                dispatch(getSession());
            }
        };

export const clearAuthToken = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
        sessionStorage.removeItem(ACCESS_TOKEN);
    }
};

export const logout = ()  => async  dispatch => {
    clearAuthToken();
    dispatch(logoutSession());
};

export const clearAuthentication = messageKey => dispatch => {
    clearAuthToken();
    dispatch(authError(messageKey));
    dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        logoutSession() {
            return {
                ...initialState
             };
        },
        authError(state, action) {
            return {
                ...state,
                  status: 'failed',
                  error: action.payload.data
            };
        },
        clearAuth(state) {
            return {
                ...initialState,
            };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(authenticate.rejected, (state, action) => {
                return {
                    ...initialState,
                    status: 'failed',
                    error: action.payload.message,
            }})
            .addCase(authenticate.fulfilled, state => {
                return {
                    ...state,
                    status: 'loading',
            }})
            .addCase(getAccount.rejected, (state, action )=> {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                }})
            .addCase(getAccount.fulfilled, (state, action) => {
                    return {
                        ... state,
                        status: 'succeeded',
                        account: action.payload.data,
                    }
            })
            .addCase(authenticate.pending, state => {
                return { ... state,
                    status: 'loading',
                }
            })
            .addCase(getAccount.pending, state => {
                return { ... state,
                    status: 'loading',
                }
            });
    },
});


//Actions
export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

//Selectors
export const errorSelector = (state)=> state.authentication.error;
export const statusSelector = (state)=>  state.authentication.status;
export const accountSelector = (state)=> state.authentication.account;

//Reducer
const rootReducer = {
    name:"authentication",
    reducer:AuthenticationSlice.reducer
};
export default rootReducer;