import { Route, Routes} from "react-router-dom";
import React, {lazy} from "react";
import AdminLayout  from "../../components/layout";
import NewGateway from "../../pages/gateway/new";
import EditGateway from "../../pages/gateway/edit";
import GatewayView from "../../pages/gateway/view";



const  Gateway = (props) => {
     //These routes are defined when this component is loaded on demand via dynamic import on the main layout
    return (
       <Routes>
                <Route path="gateways/*" element={<AdminLayout/>}>
                    <Route index element={<GatewayView/>}/>
                    <Route path="new" element={<NewGateway/>}/>
                    <Route path=":id" element={<EditGateway/>}/>
                </Route>
       </Routes>
    );
}

export  default Gateway;