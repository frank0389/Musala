import  React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {styled} from '@mui/material/styles';
import {IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';

// // context and hooks
import useLayoutState from "../../core/hooks/layout"
import RigthMenu from "./rigth-menu";
import {blueGrey} from "@mui/material/colors";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Topbar = () =>{

    const { isSidebarOpened, setIsSidebarOpened } = useLayoutState();


    return (
        <AppBar position="absolute" open={isSidebarOpened}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                    sx={{
                        marginRight: '36px',
                        ...(isSidebarOpened && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                {/*<Search/>*/}
                <Box sx={{ flexGrow: 1 }} />
                <RigthMenu/>
            </Toolbar>
        </AppBar>
    );
}

export default Topbar;
