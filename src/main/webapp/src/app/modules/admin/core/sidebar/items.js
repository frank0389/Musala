import {ROLES} from "../../../../core/utils/constants";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React from "react";
import {blue, blueGrey, lightBlue} from "@mui/material/colors";

export default [
    {
        id: 1,
        name:'user',
        allowedRoles: [ROLES.ADMIN],
        text: 'users',
        path: "/admin/users",
        icon: <AdminPanelSettingsIcon color="primary"/>
    }
]