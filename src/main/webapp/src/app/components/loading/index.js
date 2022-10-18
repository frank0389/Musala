import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {Backdrop} from "@mui/material";

const Loading = (props) => {
    const {
        open,
        ...other
    } = props;
    return (
        <Backdrop open={open} sx={{color:'#fff', zIndex:(theme => theme.zIndex.drawer+1)}}>
            <CircularProgress />
        </Backdrop>
    )
}

Loading.defaultProps = {
    open: false,
}
export default Loading;