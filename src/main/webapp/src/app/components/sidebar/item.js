import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";

const Item =(props) => {
    const {
        id,
        icon,
        text,
        link,
        ...other
    } = props;



    return (
        <ListItem button component={link && Link}
                  to={link}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
}

export default Item;