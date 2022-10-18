import {ROLES} from "../../../../core/utils/constants";
import LanIcon from '@mui/icons-material/Lan';
import React from "react";

export default [
    {
        id: 1,
        name:'gateway',
        allowedRoles: [ROLES.ADMIN],
        text: 'gateway',
        path: "/gateway/gateways",
        icon: <LanIcon color="primary"/>
    }
]