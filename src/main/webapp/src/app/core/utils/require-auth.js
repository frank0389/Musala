import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import {accountSelector} from "../reducers/authentication";


const RequireAuth = ({ allowedRoles }) => {
    const account  = useSelector(accountSelector);
    const location = useLocation();
    return (
        account?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : account
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;