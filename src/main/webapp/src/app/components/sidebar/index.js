import MuiDrawer from '@mui/material/Drawer';
import {styled} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import {IconButton} from "@mui/material";
import Logo from '../../../logo.png'
import Wlogo from '../../../wlogo.png'

import View from "./view";
import modules from "../../modules";

// context and hooks
import useLayoutState from "../../core/hooks/layout";
import { isDarkThemeSelector } from '../../core/reducers/theme';
import { useSelector } from 'react-redux';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width:0,
                [theme.breakpoints.up('sm')]: {
                    width: 0,
                },
            }),
        },
    }),
);

const SideBar= () => {

    // global
    var { isSidebarOpened, setIsSidebarOpened } = useLayoutState();
    const isDarkTheme = useSelector(isDarkThemeSelector);


    return (
        <Drawer variant="permanent" open={isSidebarOpened}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1]
                }}
            >
                 {isDarkTheme ?
                   <img width="160" height="75%" src={Wlogo}/> :
                   <img width="160" height="75%" src={Logo}/> 
                 }
                <IconButton onClick={() => setIsSidebarOpened(!isSidebarOpened)}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider/>
            <View modules={modules}/>
        </Drawer>
    );
}

export default SideBar;