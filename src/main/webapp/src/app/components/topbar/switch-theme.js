import React, {useState} from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useDispatch, useSelector} from "react-redux";
import {IconButton} from "@mui/material";
import {isDarkThemeSelector, setDarkTheme} from "../../core/reducers/theme";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";

const SwitchTheme = () => {

    const { t } = useTranslation("topbar");

    // dispatch and selector
    const dispatch = useDispatch()
    const isDarkTheme = useSelector(isDarkThemeSelector);

    const toggleColorMode = () => {
        dispatch(setDarkTheme(!isDarkTheme));
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title={isDarkTheme?t('ligthTheme'):t('darkTheme')}>
                    <IconButton sx={{ml: 2}} onClick={toggleColorMode} color="inherit">
                        {isDarkTheme ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                </Tooltip>
            </Box>
        </React.Fragment>);
};


export default SwitchTheme;