import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const PwdStrength = ( props)=> {

    const {pwd} = props;
    const {t} = useTranslation("strength");

    const normalise = (value, min, max) => ((value - min) * 100) / (max - min);

    const strength = (pwd) => {

        let strongRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        let mediumRegExp = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

        if(!pwd){
            return {color:"error",value:0,  text:t("empty")};
        }

        if(strongRegExp.test(pwd)){
            return {color: "success", value: 3,text:t("strong")};
        }
        if(mediumRegExp.test(pwd)){
            return {color: "warning",value:2, text:t("medium")};
        }
        return {color:"error", value: 1, text:t("weak")};  //return weak
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Box sx={{ width: '100%', mr:2 }}>
                <LinearProgress variant="determinate" color={strength(pwd).color} value={normalise(strength(pwd).value,0,3)} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{
                   strength(pwd).text}</Typography>
            </Box>
        </Box>
    );

};

export  default PwdStrength;