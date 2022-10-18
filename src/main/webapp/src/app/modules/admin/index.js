import React, {lazy} from "react";
import {ROLES} from "../../core/utils/constants"

// import routes from "./core/rutes"
import items from "./core/sidebar/items";
import reducers from "./core/reducers"

 const Admin =lazy(() => import(/* webpackChunkName: "admin" */`./core/rutes`));

export default {
    name: 'admin',
    allowedRoles: [ROLES.ADMIN],
    routes: [
        {
            name:'admin',
            allowedRoles: [ROLES.ADMIN],
            path: "admin/*",
            element:<Admin/>
        }
    
    ],
    sidebar:items,
    reducers: reducers
};
