import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Person} from '@mui/icons-material'

export function getIconBy (role){
    switch (role){
        case "admin":
            return <AdminPanelSettingsIcon/>
            break;
        case "system":
            return <ManageAccountsIcon/>
            break;
        default:
            return <Person/>
            break;
    }
}