import Box from '@mui/material/Box';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Divider, IconButton} from "@mui/material";
import * as React from "react";

import SwitchTranslation from "./switch-translation";
import AccountMenu from "./account-menu";
import SwitchTheme from "./switch-theme";

const RigthMenu = () => {

    return (
        <div>
            <Box sx={{display: {xs: 'none', md: 'flex',
                }}}>
                <Divider orientation="vertical" sx={{mr:1, bgcolor: "white"}} light={true} flexItem/>
                <SwitchTheme/>
                <SwitchTranslation/>
                <AccountMenu/>
            </Box>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-haspopup="true"
                    // onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon/>
                </IconButton>
            </Box>
        </div>
    );
}


export default RigthMenu;
