import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import handleError from "../../../../core/utils/handle-error";
import userApi from "../apis/users";
import rolesApi from "../apis/roles";

const initialState = {
    status: 'idle',   // 'idle','loading','succeeded','failed'
    createSuccess: false,     // true or false
    editedSuccess: false, // true or false
    error: null,      // error returned from server side
    user: null,     // user to update
    totalItems: 0, // Total items
    users: [],    // all users
    roles: [],  //all roles
};

//Thunk actions
export const getRoles = () => async (dispatch, getState) => {
    await dispatch(getAllRoles());
};

export const getUsers = (fieldName, fieldValue, page, size, sort) => async (dispatch, getState) => {
    let params = {
        fieldName: fieldName,
        fieldValue: fieldValue,
        page: page,
        size: size,
        sort: sort.property + "," + sort.direction
    };
    await dispatch(getAllUsers(params)); //const response =

};

export const createUser = (user) => async (dispatch, getState) => {
    await dispatch(appendUser(user));
};

export const removeUser = (userName, fieldName, fieldValue, page, size, sort) => async (dispatch, getState) => {

    await dispatch(deleteUser(userName));

    const {status} = getState().user;
    if (status === 'succeeded') {
        let params = {
            fieldName: fieldName,
            fieldValue: fieldValue,
            page: page,
            size: size,
            sort: sort.property + "," + sort.direction
        };
        await dispatch(getAllUsers(params));
    }
};

export const editUser = (user) => async (dispatch, getState) => {
    await dispatch(updateUser(user));
};


// Actions
export const getAllRoles = createAsyncThunk('roles/get_roles',
    async (args, {rejectWithValue}) => {
        try {
            const response = await rolesApi.getRoles();
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const getAllUsers = createAsyncThunk('users/get_allusers',
    async (params, {rejectWithValue}) => {
        try {
            const response = await userApi.getUsers(params.fieldName, params.fieldValue, params.page, params.size, params.sort);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const appendUser = createAsyncThunk(
    'users/append_user', async (params, {rejectWithValue}) => {
        try {
            const response = await userApi.createUser(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const updateUser = createAsyncThunk(
    'users/update_user', async (params, {rejectWithValue}) => {
        try {
            const response = await userApi.updateUser(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const getUser = createAsyncThunk(
    'users/get_user', async (userName, {rejectWithValue}) => {
        try {
            const response = await userApi.getUser(userName);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const deleteUser = createAsyncThunk(
    'users/delete_user', async (userName, {rejectWithValue}) => {
        try {
            const response = await userApi.deleteUser(userName);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });


export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        reset() {
            return {
                ...initialState
            };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllUsers.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                }
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'succeeded',
                    users: action.payload.data,
                    totalItems: action.payload.headers['x-total-count'],
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                }
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'succeeded',
                    user: action.payload.data,
                }
            })
            .addCase(appendUser.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                    createSuccess: false
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    editedSuccess: false,
                    error: action.payload.message,
                }
            })
            .addCase(appendUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'succeeded',
                    createSuccess: true
                };
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    editedSuccess: true,
                    status: 'succeeded',
                };
            })
            .addCase(deleteUser.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                };
            })
            .addCase(deleteUser.fulfilled, state => {
                return {
                    ...state,
                    status: 'succeeded',
                };
            })
            .addCase(getAllRoles.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                };
            })
            .addCase(getAllRoles.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'succeeded',
                    roles: action.payload.data,
                }
            })
            .addCase(getAllRoles.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;

            })
            .addCase(getAllUsers.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;


            })
            .addCase(appendUser.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;

            })
            .addCase(updateUser.pending, state => {
                state.status = 'loading';
                state.editedSuccess =false;
                state.createSuccess = false;

            })
            .addCase(deleteUser.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;

            })
            .addCase(getUser.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;
            });

    },
});

//Actions
export const { reset } = UserSlice.actions;

//Selectors
export const errorSelector = (state) => state.user.error;
export const statusSelector = (state) => state.user.status;
export const userSelector = (state) => state.user.user;
export const usersSelector = (state) => state.user.users;
export const totalItemsSelector = (state) => state.user.totalItems;
export const rolesSelector = (state) => state.user.roles;
export const createSuccessSelector = (state) => state.user.createSuccess;
export const editedSuccessSelector = (state) => state.user.editedSuccess;

// export default reducer
const rootReducer = {
    name: "user",
    reducer: UserSlice.reducer
};

export default rootReducer;