import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import handleError from "../../../../core/utils/handle-error";
import gatewayApi from "../apis/gateway";

const initialState = {
    status: 'idle',   // 'idle','loading','succeeded','failed'
    createSuccess: false,     // true or false
    editedSuccess: false, // true or false
    error: null,      // error returned from server side
    gateway: null,     // gateway to update
    totalItems: 0, // Total items
    gateways: [],    // all gateways
};

//Thunk actions


export const getGateways = (fieldName, fieldValue, page, size, sort) => async (dispatch, getState) => {
    let params = {
        fieldName: fieldName,
        fieldValue: fieldValue,
        page: page,
        size: size,
        sort: sort.property + "," + sort.direction
    };
    await dispatch(getAllGateways(params)); //const response =

};

export const createGateway = (gateway) => async (dispatch, getState) => {
    await dispatch(appendUser(gateways));
};

export const removeGateway = (id, fieldName, fieldValue, page, size, sort) => async (dispatch, getState) => {

    await dispatch(deleteGateway(id));

    const {status} = getState().gateway;
    if (status === 'succeeded') {
        let params = {
            fieldName: fieldName,
            fieldValue: fieldValue,
            page: page,
            size: size,
            sort: sort.property + "," + sort.direction
        };
        await dispatch(getAllGateways(params));
    }
};

export const editUser = (user) => async (dispatch, getState) => {
    await dispatch(updateUser(user));
};


// Actions

export const getAllGateways = createAsyncThunk(
    'gateways/get_allgateways',
    async (params, {rejectWithValue}) => {
        try {
            const response = await gatewayApi.getGateways(params.fieldName, params.fieldValue, params.page, params.size, params.sort);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const appendGateway = createAsyncThunk(
    'gateways/append_gateway', async (params, {rejectWithValue}) => {
        try {
            const response = await gatewayApi.createGateway(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const updateGateway = createAsyncThunk(
    'gateways/update_gateway', async (params, {rejectWithValue}) => {
        try {
            const response = await gatewayApi.updateGateway(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const getGateway = createAsyncThunk(
    'gateways/get_gateway', async (id, {rejectWithValue}) => {
        try {
            const response = await gatewayApi.getGateway(id);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });

export const deleteGateway = createAsyncThunk(
    'gateways/delete_gateway', async (id, {rejectWithValue}) => {
        try {
            const response = await gatewayApi.deleteGateway(id);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    });


export const GatewaySlice = createSlice({
    name: 'gateway',
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
            .addCase(getAllGateways.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                }
            })
            .addCase(getAllGateways.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'succeeded',
                    gateways: action.payload.data,
                    totalItems: action.payload.headers['x-total-count'],
                }
            })
            .addCase(getGateway.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                }
            })
            .addCase(getGateway.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'succeeded',
                    gateway: action.payload.data,
                }
            })
            .addCase(appendGateway.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                    createSuccess: false
                }
            })
            .addCase(updateGateway.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    editedSuccess: false,
                    error: action.payload.message,
                }
            })
            .addCase(appendGateway.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: 'succeeded',
                    createSuccess: true
                };
            })
            .addCase(updateGateway.fulfilled, (state, action) => {
                return {
                    ...state,
                    editedSuccess: true,
                    status: 'succeeded',
                };
            })
            .addCase(deleteGateway.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed',
                    error: action.payload.message,
                };
            })
            .addCase(deleteGateway.fulfilled, state => {
                return {
                    ...state,
                    status: 'succeeded',
                };
            })
            .addCase(getAllGateways.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;


            })
            .addCase(appendGateway.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;

            })
            .addCase(updateGateway.pending, state => {
                state.status = 'loading';
                state.editedSuccess =false;
                state.createSuccess = false;

            })
            .addCase(deleteGateway.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;

            })
            .addCase(getGateway.pending, state => {
                state.status = 'loading';
                state.createSuccess = false;
                state.editedSuccess =false;
            });

    },
});

//Actions
export const { reset } = GatewaySlice.actions;

//Selectors
export const errorSelector = (state) => state.gateway.error;
export const statusSelector = (state) => state.gateway.status;
export const gatewaySelector = (state) => state.gateway.gateway;
export const gatewaysSelector = (state) => state.gateway.gateways;
export const totalItemsSelector = (state) => state.gateway.totalItems;
export const createSuccessSelector = (state) => state.gateway.createSuccess;
export const editedSuccessSelector = (state) => state.gateway.editedSuccess;

// export default reducer
const rootReducer = {
    name: "gateway",
    reducer: GatewaySlice.reducer
};

export default rootReducer;