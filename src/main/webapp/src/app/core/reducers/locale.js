import { createSlice } from '@reduxjs/toolkit';
import i18n from "i18next";


//Initial state
const initialState = {
    currentLocale: 'en',
    updated: false
};

//Thunk action
export const setLocale = locale => async dispatch => {
    i18n.changeLanguage(locale)
    dispatch(updateLocale(locale));
};

export const LocaleSlice = createSlice({
    name: 'locale',
    initialState: initialState ,
    reducers: {
        updateLocale(state, action) {
            const currentLocale = action.payload;
            state.currentLocale = currentLocale;
            state.updated= true;
        },
    },
});


// Actions
export const { updateLocale } = LocaleSlice.actions;

//Selectors
export const localeSelector = (state)=> state.locale.currentLocale;

// Reducer
const rootReducer = {
    name:"locale",
    reducer:LocaleSlice.reducer
};
export default rootReducer;