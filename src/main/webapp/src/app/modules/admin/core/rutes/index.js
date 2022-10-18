import { Route, Routes} from "react-router-dom";
import React, {lazy} from "react";
import AdminLayout  from "../../components/layout";
import NewUser from "../../pages/user/new";
import EditUser from "../../pages/user/edit";
import UsersView from "../../pages/user/view";

const  Admin = (props) => {
    return (
       <Routes>
                <Route path="users/*" element={<AdminLayout/>}>
                    <Route index element={<UsersView/>}/>
                    <Route path="new" element={<NewUser/>}/>
                    <Route path=":userName" element={<EditUser/>}/>
                </Route>
       </Routes>
    );
}

export  default Admin;