import React from "react";
import Container from "@mui/material/Container";
import {Outlet} from "react-router-dom";


const  AdminLayout = (props) => {
    return (
        <Container maxWidth={false}>
            <Outlet/>
        </Container>
    );
}

export  default AdminLayout;