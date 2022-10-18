import React, {lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./app/pages/login";
import Layout from "./app/components/layout";
import Loading from "./app/components/loading";
import ErrorBoundary from "./app/core/utils/error-boundary";
import modules from './app/modules'
import themes from './app/themes'

import i18n from "./i18n/i18n"; //initialize i18n conf
import RequireAuth from "./app/core/utils/require-auth";
import {useDispatch, useSelector} from "react-redux";
import {getSession} from "./app/core/reducers/authentication";
import {CssBaseline, ThemeProvider,createTheme} from "@mui/material";
import {ACCESS_TOKEN, ROLES} from "./app/core/utils/constants"
import {isDarkThemeSelector} from "./app/core/reducers/theme"
import Profile from "./app/pages/profile";

const App = ()=> {

    const isDarkTheme = useSelector(isDarkThemeSelector);
    const dispatch = useDispatch();

    useEffect(
        () => {
            const token =  localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);
             if (token) {
                dispatch(getSession())
            }
        },[] )

    return (
        <ThemeProvider theme={isDarkTheme ? themes.dark : themes.light}>
            <CssBaseline />
            <ErrorBoundary>
                <Suspense fallback={<Loading open={true}/>}>
                    <Router>
                        <Routes>
                            <Route element={<RequireAuth allowedRoles={[ROLES.USER,ROLES.ADMIN]}/>}>
                             <Route path="/" element={<Layout/>}>
                                {/* we want to protect all routes */}
                                {modules.map( (module) => (
                                    module.routes.map( (route) => (
                                        <Route element={<RequireAuth allowedRoles={route.allowedRoles} />}>
                                            <Route path={route.path}   key={route.name} element={route.element}/>
                                        </Route>
                                    )
                                )))}
                               <Route path="profile" element={<Profile/>}/>
                             </Route>
                            </Route>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </Router>
                </Suspense>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
