import React from "react";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import {Outlet} from "react-router-dom";
import {Toolbar} from "@mui/material";


import SideBar from "../sidebar";
import Topbar from "../topbar";
import Footer from "../footer";

const Layout = (props) =>{
    return (
        <Box sx={{display: 'flex'}}>
            <Topbar/>
            <SideBar/>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth={false} sx={{mt: 4, mb: 4}}>
                    <Outlet/>
                    <Footer sx={{position: 'fixed', bottom:0, left:'50%'}}/>
                </Container>
            </Box>
        </Box>);
}

export default Layout;