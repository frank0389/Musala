import React, {lazy} from "react";
import {ROLES} from "../../core/utils/constants"
import items from "./core/sidebar/items";
import reducers from "./core/reducers"

 const Gateway =lazy(() => import(/* webpackChunkName: "gateway" */`./core/rutes`));

export default {
    name: 'gateway',
    allowedRoles: [ROLES.ADMIN],
    routes: [
        {
            name:'gateway',
            allowedRoles: [ROLES.ADMIN],
            path: "gateway/*",
            element:<Gateway/>
        }
    
    ],
    sidebar:items,
    reducers: reducers
};
