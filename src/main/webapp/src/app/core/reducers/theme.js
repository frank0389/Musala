import { createSlice } from '@reduxjs/toolkit';

//Initial state
const initialState = {
    isDarkTheme: localStorage.getItem("isDarkTheme") === 'true'
};

export const setDarkTheme = isDark => async dispatch => {
    let strValue = localStorage.getItem("isDarkTheme");
    let isDarkTheme = strValue && (strValue === 'true');
    if(isDarkTheme !== isDark){
        dispatch(updateTheme(isDark));
        localStorage.setItem("isDarkTheme",isDark);
    }

};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState: initialState ,
    reducers: {
        updateTheme(state, action) {
            const isDark = action.payload;
            state.isDarkTheme = isDark;
        },
    },
});


// Actions
export const { updateTheme } = ThemeSlice.actions;

//Selectors
export const isDarkThemeSelector = (state)=> state.theme.isDarkTheme;

// Reducer
const rootReducer = {name:"theme", reducer:ThemeSlice.reducer};
export default rootReducer;