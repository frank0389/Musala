import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {CardContent, CardHeader, Collapse, Divider} from "@mui/material";
import Footer from "../../components/footer"
import * as React from "react";
import Alert from '@mui/material/Alert';
import {Link as RouterLink, Navigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {login, statusSelector, errorSelector, accountSelector} from "../../core/reducers/authentication";

import {useState} from "react";
import Loading from "../../components/loading";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconTextField from "../../components/textfield";

const Login = () => {
    const {t} = useTranslation("login");

    const dispatch = useDispatch();
    const account = useSelector(accountSelector);
    const status = useSelector(statusSelector);
    const error = useSelector(errorSelector);

    const [userNameInputError, setUserNameInputError] = useState({error: false, message: ''});
    const [passwordInputError, setPasswordInputError] = useState({error: false, message: ''});
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({userName:'', password: '', rememberMe: false})

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        let pwdRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

        // validate form
        if (user.userName == null ||
            user.userName == undefined ||
            user.userName.length == 0) {
            setUserNameInputError({error: true, message: t('requiredError')});
            setPasswordInputError({error: false, message: ''});
        }  else if (user.password == null ||
            user.password == undefined ||
            user.password.length == 0) {
            setUserNameInputError({error: false, message: ''});
            setPasswordInputError({error: true, message: t('requiredError')});
        } else if (!pwdRegExp.test(user.password)) {
            setUserNameInputError({error: false, message: ''});
            setPasswordInputError({error: true, message: t('invalidPassword')});
        } else {
            setUserNameInputError({error: false, message: ''});
            setPasswordInputError({error: false, message: ''});
            dispatch(login(user.userName, user.password, user.rememberMe));
        }
    }

    const handlePassword = (event) => {
        setUser({
            ...user,
            password: event.target.value
        })

        if (event.target.value == null || event.target.value.length == 0) {
            setPasswordInputError({error: true, message: t('requiredError')});
        } else {
            setPasswordInputError({error: false, message: ''});
        }
    };

    const handleUserName = (event) => {
        setUser({
            ...user,
            userName: event.target.value
        })

        if (event.target.value == null || event.target.value.length == 0) {
            setUserNameInputError({error: true, message: t('requiredError')});
        } else {
            setUserNameInputError({error: false, message: ''});
        }
    };

    const handleRememberMe = (event) => {
        setUser({
            ...user,
            rememberMe: event.target.checked
        })

    };

    if (status === 'succeeded') {
        if (account)
            return <Navigate to="/"/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <Loading open={status === 'loading' ? true : false}></Loading>
            <Grid container alignItems='center'
                  justify='center'
                  sx={{mt: 8}}
            >
                <Grid item xs>
                    <Card>
                        <CardHeader title={
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Avatar
                                    sx={{
                                        height: 75,
                                        mb: 2,
                                        width: 75,
                                        bgcolor: "white"
                                    }}
                                >
                                    <VerifiedUserOutlinedIcon color="primary" sx={{
                                        height: 75,
                                        width: 75
                                    }}/>
                                </Avatar>
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h5"
                                >
                                    {t('title', {appName: process.env.APP_NAME})}
                                </Typography>
                                <Collapse in={status === 'failed'}>
                                    <Alert color="error" severity="error"
                                           sx={{mb: 2, backgroundColor: "transparent"}}
                                    >
                                        {t("authError") + ": " + error}
                                    </Alert>
                                </Collapse>
                            </Box>}>
                        </CardHeader>
                        <Divider/>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={userNameInputError.error}
                                            helperText={userNameInputError.message}
                                            margin="normal"
                                            fullWidth
                                            id="userName"
                                            label={t('userName')}
                                            name="userName"
                                            autoFocus
                                            variant="standard"
                                            onChange={handleUserName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <IconTextField
                                            error={passwordInputError.error}
                                            helperText={passwordInputError.message}
                                            fullWidth
                                            onChange={handlePassword}
                                            onEndIconClick={handleShowPassword}
                                            type={showPassword ? 'text' : 'password'}
                                            variant="standard"
                                            label={t("password")}
                                            id="password"
                                            name="password"
                                            iconEnd={showPassword ? <VisibilityOff/> : <Visibility/>}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="rememberMe" color="primary"
                                                               checked={user.rememberMe}
                                                               onChange={handleRememberMe}/>}
                                            label={<Typography color="textPrimary"
                                                               gutterBottom
                                                               variant="body2"> {t('rememberMe')}</Typography>}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                            color="primary"
                                        >
                                            {t('signIn')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                    <Footer sx={{mt: 8, mb: 4}}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;