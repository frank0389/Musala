import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import accountApi from "../apis/account";
import handleError from "../utils/handle-error";
import {getSession} from "./authentication";

const initialState = {
    status: 'idle',  //'idle','loading','succeeded','failed'
    error: null, // Errors returned from server side
};


//Thunk action
export const updateProfile = (profile) => async (dispatch,getState) => {
  await dispatch(setProfile(profile)); //const accountAction =

    const { status } = getState().profile;
    if (status === 'succeeded') {
        dispatch(getSession());
    }
};

export const updatePassword = (pwd) => async (dispatch,getState) => {
    await dispatch(changePassword(pwd));
};

// Async Actions
export const setProfile = createAsyncThunk(
    'profile/set_profile', async (params,{ rejectWithValue }) => {
        try {
            const response = await accountApi.update(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const changePassword = createAsyncThunk(
    'profile/change_password', async (params,{ rejectWithValue }) => {
        try {
            const response = await accountApi.changePassword(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });


export const ProfileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        clearProfile() {
            return {
                ...initialState
            };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(setProfile.rejected, (state, action )=> {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                }})
            .addCase(changePassword.rejected, (state, action )=> {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                }})
            .addCase(setProfile.fulfilled, (state, action) => {
                return {
                    ... state,
                    status: 'succeeded',
                }
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                return {
                    ... state,
                    status: 'succeeded',
                }
            })
            .addCase(changePassword.pending, state => {
                return { ... state,
                    status: 'loading',
                }
            })
            .addCase(setProfile.pending, state => {
                return { ... state,
                    status: 'loading',
                }
            });
    },
});


//Actions
export const { clearProfile } = ProfileSlice.actions;

//Selectors
export const errorSelector = (state)=> state.profile.error;
export const statusSelector = (state)=>  state.profile.status;

//Reducer
const rootReducer = {
    name:"profile",
    reducer:ProfileSlice.reducer
};
export default rootReducer;