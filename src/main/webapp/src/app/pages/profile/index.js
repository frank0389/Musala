import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {
    CardContent,
    Chip, Collapse, IconButton, TextField,
} from "@mui/material";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {AccountCircleSharp, GroupAddRounded, Person, Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

import Loading from "../../components/loading";
import {errorSelector, statusSelector, updateProfile, updatePassword, clearProfile} from "../../core/reducers/profile";
import {getIconBy} from "../../core/utils/fun";
import Alert from "@mui/material/Alert";
import {accountSelector, getSession} from "../../core/reducers/authentication";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import IconTextField from "../../components/textfield";
import PwdStrength from "../../components/strength";


const Profile = (props) => {
    const {t} = useTranslation("profile");
    const [firstNameInputError, setFirstNameInputError] = useState({error: false, message: ''});
    const [lastNameInputError, setLastNameInputError] = useState({error: false, message: ''});
    const [currentPwdInputError, setCurrentPwdInputError] = useState({error: false, message: ''});
    const [newPwdInputError, setNewPwdInputError] = useState({error: false, message: ''});

    const dispatch = useDispatch();
    const account = useSelector(accountSelector);
    const status = useSelector(statusSelector);
    const error = useSelector(errorSelector);

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const [pwd, setPwd] = useState({currentPassword: '', newPassword: ''});
    const [values, setValues] = useState({
        firstName: account.firstName,
        lastName: account.lastName,
        userName: account.userName,
        langKey: account.langKey,
        roles: account.roles
    });


    const handleFirstName = (event) => {

        setFirstNameInputError({error: false, message: ''});
        setValues({
            ...values,
            firstName: event.target.value
        });
    }

    const handleLastName = (event) => {
        setLastNameInputError({error: false, message: ''});

        setValues({
            ...values,
            lastName: event.target.value
        })
    }


    const handleUpdateProfile = () => {

        if (values.firstName == null ||
            values.firstName == undefined ||
            values.firstName.length == 0) {
            setFirstNameInputError({error: true, message: t('requiredError')});
            setLastNameInputError({error: false, message: ''});
        } else if (values.lastName == null ||
            values.lastName == undefined ||
            values.lastName.length == 0) {
            setLastNameInputError({error: true, message: t('requiredError')});
            setFirstNameInputError({error: false, message: ''});

        } else {
            dispatch(updateProfile(values));
        }
    }

    useEffect(() => {
        dispatch(clearProfile());
    },[]);

    const handleCurrentPassword = (event) => {
        setCurrentPwdInputError({error: false, message: ''});

        setPwd({
            ...
                pwd,
            currentPassword: event.target.value
        });
    }

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    const handleNewPassword = (event) => {
        setNewPwdInputError({error: false, message: ''});

        setPwd({
            ...
                pwd,
            newPassword: event.target.value
        });
    }

    const handleUpdatePwd = () => {
        let pwdRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

        if (pwd.currentPassword == null ||
            pwd.currentPassword == undefined ||
            pwd.currentPassword.length == 0) {
            setCurrentPwdInputError({error: true, message: t('requiredError')});
            setNewPwdInputError({error: false, message: ''});

        } else if (!pwdRegExp.test(pwd.currentPassword)) {
            setCurrentPwdInputError({error: true, message: t('invalidPwdError')});
            setNewPwdInputError({error: false, message: ''});
        } else if (pwd.newPassword == null ||
            pwd.newPassword == undefined ||
            pwd.newPassword.length == 0) {
            setCurrentPwdInputError({error: true, message: ''});
            setNewPwdInputError({error: false, message: t('requiredError')});
        } else if (!pwdRegExp.test(pwd.newPassword)) {
            setCurrentPwdInputError({error: true, message: ''});
            setNewPwdInputError({error: false, message: t('invalidPwdError')});
        } else {
            setPwd({
                currentPassword: '',
                newPassword: ''
            });
            dispatch(updatePassword(pwd));
        }

    }

    return (
        <Container maxWidth="md">
            <Loading open={status === 'loading' ? true : false}></Loading>
            <Collapse in={status === 'failed'}>
                <Alert color="error" severity="error"
                       sx={{mb: 2, backgroundColor: "transparent"}}
                >
                    {t("updateProfileError") + "." + error}
                </Alert>
            </Collapse>
            <Collapse in={status === 'succeeded'}>
                <Alert color="success" severity="success"
                       sx={{mb: 2, backgroundColor: "transparent"}}
                >
                    {t("updateProfileSuccess")}
                </Alert>
            </Collapse>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Toolbar>
                            <IconButton
                                edge="start" color="inherit" aria-label="Profile" sx={{mr: 0.5}}
                            >
                                <Person/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div">
                                {account.userName}
                            </Typography>
                        </Toolbar>
                    </Paper>
                </Grid>
                <Grid item md={4}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 2
                                }}
                            >
                                <Avatar sx={{bgcolor: "white", width: 100, height: 100}}>
                                    <AccountCircleSharp color="primary" sx={{
                                        height: 100,
                                        width: 100
                                    }}/>
                                </Avatar>
                            </Box>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="body1" align="center">
                                        {values.firstName + " " + values.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="center">
                                        {
                                            values.roles.map(role => (
                                                <Chip key={role} icon={getIconBy(role)} label={role}
                                                      variant="outlined"/>
                                            ))
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={8}>
                    <Card>
                        <CardHeader title={<Typography
                            color="textPrimary"
                            align="center"
                            gutterBottom
                            variant="h6"
                        >{t('edit')}
                        </Typography>}>
                        </CardHeader>
                        <Divider/>
                        <CardContent>
                            <Box component="form" noValidate sx={{mt: 1}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={firstNameInputError.error}
                                            helperText={firstNameInputError.message}
                                            autoComplete="given-name"
                                            name="firstName"
                                            fullWidth
                                            id="firstName"
                                            label={t('firstName')}
                                            onChange={handleFirstName}
                                            value={values.firstName}
                                            autoFocus
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={lastNameInputError.error}
                                            helperText={lastNameInputError.message}
                                            fullWidth
                                            id="lastName"
                                            label={t('lastName')}
                                            onChange={handleLastName}
                                            name="lastName"
                                            value={values.lastName}
                                            autoComplete="family-name"
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button onClick={handleUpdateProfile} variant="contained">
                                                {t("updateButtonText")}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4}>
                </Grid>
                <Grid item md={8}>
                    <Card>
                        <CardHeader title={<Typography
                            color="textPrimary"
                            align="center"
                            gutterBottom
                            variant="h6"
                        >{t('pwd')}
                        </Typography>}>
                        </CardHeader>
                        <Divider/>
                        <CardContent>
                            <Box component="form" noValidate sx={{mt: 1}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <IconTextField
                                            error={currentPwdInputError.error}
                                            helperText={currentPwdInputError.message}
                                            fullWidth
                                            value={pwd.currentPassword}
                                            onChange={handleCurrentPassword}
                                            onEndIconClick={handleShowCurrentPassword}
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            variant="standard"
                                            label={t("currentPwd")}
                                            id="currentPwd"
                                            name="currentPwd"
                                            iconEnd={showCurrentPassword ? <VisibilityOff/> : <Visibility/>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <IconTextField
                                            error={newPwdInputError.error}
                                            helperText={newPwdInputError.message}
                                            fullWidth
                                            value={pwd.newPassword}
                                            onChange={handleNewPassword}
                                            onEndIconClick={handleShowNewPassword}
                                            type={showNewPassword ? 'text' : 'password'}
                                            variant="standard"
                                            label={t("newPwd")}
                                            id="newPwd"
                                            name="newPwd"
                                            iconEnd={showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                        />
                                        <PwdStrength pwd={pwd.newPassword}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button onClick={handleUpdatePwd} variant="contained">
                                                {t("updateButtonText")}
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>

    );
}

export default Profile;