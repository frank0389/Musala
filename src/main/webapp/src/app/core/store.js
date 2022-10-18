import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers'

const store = configureStore({
   reducer,
    middleware: getDefaultMiddleware =>
         getDefaultMiddleware({
             serializableCheck: {
                 // Ignore these field paths in all actions
                 ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
             },
         }),
});

export  default store;
