import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {
    Alert,
    CardContent,
    Chip,
    Collapse,
    FormControl, FormHelperText, IconButton,
    InputLabel,
    Select, Stack,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {
    AccountBox,
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../../../components/loading";
import MenuItem from "@mui/material/MenuItem";
import {
    editedSuccessSelector,
    errorSelector,
    getRoles,
    rolesSelector,
    editUser,
    statusSelector,
    getUser,
    userSelector
} from "../../../core/reducers/users";
import {getIconBy} from "../../../../../core/utils/fun";
import {useTheme} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import {useNavigate, useParams} from "react-router";

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const EditUser = (props) => {

    const {t} = useTranslation("editu");
    const theme = useTheme();
    const navigate = useNavigate();
    const {userName} = useParams();

    const [langKeyInputError, setLangKeyInputError] = useState({error: false, message: ''});
    const [userNameInputError, setUserNameInputError] = useState({error: false, message: ''});
    const [firstNameInputError, setFirstNameInputError] = useState({error: false, message: ''});
    const [lastNameInputError, setLastNameInputError] = useState({error: false, message: ''});
    const [rolesInputError, setRolesInputError] = useState({error: false, message: ''});

    const [selectedRoles, setSelectedRoles] = useState([]);

    const [user, setUser] = useState(null);
    const languages = ['es', 'en'];

    const dispatch = useDispatch();
    const editedSuccess = useSelector(editedSuccessSelector);
    const status = useSelector(statusSelector);
    const currentUser = useSelector(userSelector);
    const error = useSelector(errorSelector);
    const roles = useSelector(rolesSelector);

    useEffect(() => {
        dispatch(getRoles())
        dispatch(getUser(userName))
    }, [userName])

    //This useeffect is for update user attr
    useEffect(() => {
      if(currentUser != null)  {
        setUser(currentUser);
      
    }
       
   }, [currentUser])


    const handleFirstName = (event) => {
        setFirstNameInputError({error: false, message: ''});

        setUser({
            ...user,
            firstName: event.target.value
        });
    }

    const handleLastName = (event) => {
        setLastNameInputError({error: false, message: ''});
        setUser({
            ...user,
            lastName: event.target.value
        });
    }

    const handleUserName = (event) => {
        setUserNameInputError({error: false, message: ''});

        setUser({
            ...user,
            userName: event.target.value
        });
    }

    const handleLangKey = (event) => {
        setLangKeyInputError({error: false, message: ''});

        setUser({
            ...user,
            langKey: event.target.value
        });
    }

    const handleSelectedRole = (event) => {
        setRolesInputError({error: false, message: ''});
        const {
            target: {value},
        } = event;
        setSelectedRoles(
            typeof value === 'string' ? value.split(',') : value,
        );
        setUser({
            ...user,
            roles: typeof value === 'string' ? value.split(',') : value,
        });
    }

    const handleCancel = () => {
        navigate("/admin/users");
    }

    

    const handleAccept = () => {

        if (user.firstName == null ||
            user.firstName == undefined ||
            user.firstName.length == 0) {
            setLastNameInputError({error: false, message: ''});
            setLangKeyInputError({error: false, message: ''});
            setEmailInputError({error: false, message: ''});
            setRolesInputError({error: false, message: ''});
            setFirstNameInputError({error: true, message: t('requiredError')});
        } else if (user.lastName == null ||
            user.lastName == undefined ||
            user.lastName.length == 0) {
            setFirstNameInputError({error: false, message: ''});
            setEmailInputError({error: false, message: ''});
            setLangKeyInputError({error: false, message: ''});
            setRolesInputError({error: false, message: ''});
            setLastNameInputError({error: true, message: t('requiredError')});

        } else if(user.userName == null ||
            user.userName == undefined ||
            user.userName.length == 0) {
            setLastNameInputError({error: false, message: ''});
            setFirstNameInputError({error: false, message: ''});
            setLangKeyInputError({error: false, message: ''});
            setRolesInputError({error: false, message: ''});
            setUserNameInputError({error: true, message: t('requiredError')});

        } else if (user.langKey == null ||
            user.langKey == undefined ||
            user.langKey.length == 0) {
            setLastNameInputError({error: false, message: ''});
            setFirstNameInputError({error: false, message: ''});
            setEmailInputError({error: false, message: ''});
            setRolesInputError({error: false, message: ''});
            setLangKeyInputError({error: true, message: t('requiredError')});

        } else if (user.roles.length == 0) {
            setLastNameInputError({error: false, message: ''});
            setFirstNameInputError({error: false, message: ''});
            setEmailInputError({error: false, message: ''});
            setLangKeyInputError({error: false, message: ''});
            setRolesInputError({error: true, message: t('requiredError')});
        } else {
            //dispatch
            console.log(JSON.stringify(user));
            dispatch(editUser(user));
        }

    }
        
    if(user === null ||  roles.length === 0 )
        return <Loading open={true} />

    return (
        <Container component="main" maxWidth="md">
            <Loading open={status === 'loading' ? true : false}></Loading>

            <Collapse in={status === 'failed'}>
                <Alert color="error" severity="error"
                       sx={{mb: 2, backgroundColor: "transparent"}}
                >
                    {t("errorMessage") + "." + error}
                </Alert>
            </Collapse>
            <Collapse in={editedSuccess === true}>
                <Alert color="success" severity="success"
                       sx={{mb: 2, backgroundColor: "transparent"}}
                >
                    {t("successMessage")}
                </Alert>
            </Collapse>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Toolbar>
                            <IconButton
                                edge="start" color="inherit" aria-label="Add User" sx={{mr: 0.5}}
                            >
                                <AccountBox/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div">
                                {t('title')}
                            </Typography>
                        </Toolbar>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
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
                                        value={user.firstName}
                                        onChange={handleFirstName}
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
                                        value={user.lastName}
                                        name="lastName"
                                        autoComplete="family-name"
                                        variant="standard"
                                    />
                                </Grid>
                                 <Grid item xs={12} sm={6}>
                                   <TextField
                                       error={userNameInputError.error}
                                       helperText={userNameInputError.message}
                                       fullWidth
                                       id="userName"
                                       label={t('userName')}
                                       onChange={handleUserName}
                                       value={user.userName}
                                       name="userName"
                                       autoComplete="userName"
                                      variant="standard"
                                />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="language-label">{t('language')}</InputLabel>
                                        <Select
                                            labelId="language-label"
                                            id="language"
                                            error={langKeyInputError.error}
                                            value={user.langKey}
                                            label={t('language')}
                                            variant="standard"
                                            onChange={handleLangKey}
                                        >
                                            {
                                                languages.map(lang => (
                                                    <MenuItem key={lang} value={lang}>
                                                        {lang} </MenuItem>
                                                ))

                                            }
                                        </Select>
                                        <FormHelperText>{langKeyInputError.message}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl sx={{width: '100%'}}>
                                        <InputLabel id="select-role-label">{t("roles")} </InputLabel>
                                        <Select
                                            id="multiple"
                                            multiple
                                            error={rolesInputError.error}
                                            value={user.roles}
                                            onChange={handleSelectedRole}
                                            variant="standard"
                                            renderValue={(selected) => (
                                                <Box sx={{
                                                    display: 'flex',
                                                    border: 'none',
                                                    flexWrap: 'wrap',
                                                    gap: 0.5
                                                }}>
                                                    {selected.map((value) => (
                                                        <Chip
                                                            key={value}
                                                            icon={getIconBy(value)}
                                                            variant="outlined"
                                                            label={value}
                                                        />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            {roles.map((role) => (
                                                <MenuItem
                                                    key={role.id}
                                                    value={role.name}
                                                    style={getStyles(role.name, selectedRoles, theme)}
                                                >
                                                    {role.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{rolesInputError.message}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCancel}
                            >
                                {t('cancelButtonText')}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAccept}
                            >
                                {t('acceptButtonText')}
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    );
}

export default EditUser;