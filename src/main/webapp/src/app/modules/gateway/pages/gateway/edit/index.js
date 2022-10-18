import React, { useEffect, useState } from "react";
import {
    Alert, Box, Button, Card, CardContent, Checkbox, Collapse,
    Container, FormControlLabel, Grid, IconButton, Paper, Table,
    TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow,
    TextField, Toolbar, Tooltip, Typography
} from "@mui/material";
import Loading from "../../../../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { editedSuccessSelector, errorSelector, gatewaySelector, getGateway, statusSelector, updateGateway } from "../../../core/reducers/gateway";
import { useTranslation } from "react-i18next";
import { AddCircle, AdUnits, DeleteOutlined, Edit } from "@mui/icons-material";
import Search from "../../../../../components/table/search";
import { Stack } from "@mui/system";
import * as moment from 'moment';
import ConfirmDialog from "../../../../../components/dialogs/confirm";
import ErrorDialog from "../../../../../components/dialogs/error";
import { useNavigate, useParams } from "react-router";

const EditGateway = (props) => {

    const { t } = useTranslation("gateway");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const columns = [
        { id: 'vendor', label: t('column.vendor'), minWidth: 100 },
        { id: 'date', label: t('column.date'), minWidth: 100 },
        { id: 'online', label: t('column.status'), minWidth: 100, },
        { id: 'actions', label: t('column.actions'), minWidth: 100, align: 'center' }
    ];

    const [devices, setDevice] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const {id} = useParams();
    const error = useSelector(errorSelector);
    const status = useSelector(statusSelector);
    const editedSuccess = useSelector(editedSuccessSelector);
    const currentGateway = useSelector(gatewaySelector);

    const [hrNameInputError, sethrNameInputError] = useState({ error: false, message: '' });
    const [serialNumberInputError, setSerialNumberInputError] = useState({ error: false, message: '' });
    const [ipV4InputError, setIpV4InputError] = useState({ error: false, message: '' });
    const [values, setValues] = useState(null);
    const [vendorInputError, setVendorInputError] = useState({ error: false, message: '' });
    const [dateInputError, setDateInputError] = useState({ error: false, message: '' });

    const [dvalues, setDValues] = useState({
        vendor: '',
        date: '',
        online: false
    });

    const [selectedDevice, setSelectedDevice] = useState(0);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [filter, setFilter] = useState({ column: '', text: '' });

    const searchOption = [t("column.vendor"), t('column.date')];
    
    useEffect(() => {
        dispatch(getGateway(id))
    }, [id])

    //This useeffect is for update user attr
    useEffect(() => {

        if(currentGateway != null)  {
        setValues(currentGateway);
        if(currentGateway.devices != null)
          setDevice(currentGateway.devices);
    }
       
   }, [currentGateway])


    const handleVendor = () => {
        setVendorInputError({ error: false, message: '' });

        setDValues({
            ...dvalues,
            vendor: event.target.value
        })

    }

    const handleDate = (event) => {
        setDateInputError({ error: false, message: '' });

        setDValues({
            ...dvalues,
            date: event.target.value
        })
    }

    const handleOnline = (event) => {
        setDValues({
            ...dvalues,
            online: event.target.checked
        });
    };

    const handleHRName = (event) => {

        sethrNameInputError({ error: false, message: '' });

        setValues({
            ...values,
            hrName: event.target.value
        })
    }

    const handleSerialNumber = (event) => {
        setSerialNumberInputError({ error: false, message: '' });

        setValues({
            ...values,
            serialNumber: event.target.value
        })

    }

    const handleIpV4 = (event) => {
        setIpV4InputError({ error: false, message: '' });

        setValues({
            ...values,
            ipV4: event.target.value
        })
    }

    const handleSearch = (text, option) => {
        if (text === null ||
            text === undefined ||
            text.length === 0) {
            setFilter({ column: "", text: "" })

        } else {
            const column = columns.find(column => column.label === option);
            if (column) {
                setFilter({ column: column.id, text: text })
            }
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleNewDevice = () => {

        if (devices.length === 10) {
            setOpenErrorDialog(true);
        }
        else if (dvalues.vendor == null ||
            dvalues.vendor == undefined ||
            dvalues.vendor.length == 0) {
            setDateInputError({ error: false, message: '' });
            setVendorInputError({ error: true, message: t('requiredError') });
        } else if (dvalues.date == null || dvalues.date == undefined ||
            dvalues.date.length == 0) {
            setDateInputError({ error: false, message: t('requiredError') });
            setVendorInputError({ error: true, message: '' });
        } else if (moment(dvalues.date, 'YYYY-MM-DD', true).isValid() === false) {
            setVendorInputError({ error: false, message: '' });
            setDateInputError({ error: true, message: t('invalidDate') });

        } else {
            setDevice([...devices, dvalues]);
            setDValues({ vendor: '', date: '', online: false })
        }

    }

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    }
    const handleAcceptConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setDevice([
            ...devices.slice(0, selectedDevice),
            ...devices.slice(selectedDevice + 1),
        ]);


    }

    const handleAcceptErrorDialog = () => {
        setOpenErrorDialog(false);
    }

    const handleUpdateGateway = () => {
        var ipRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        if (values.hrName == null ||
            values.hrName == undefined ||
            values.hrName.length == 0) {
            setIpV4InputError({ error: false, message: '' });
            sethrNameInputError({ error: true, message: t('requiredError') });
        } else if (values.ipV4 == null || values.ipV4 == undefined ||
            values.ipV4.length == 0) {
            setIpV4InputError({ error: false, message: t('requiredError') });
            sethrNameInputError({ error: true, message: '' });
        }
        else if (!ipRegExp.test(values.ipV4)) {
            setIpV4InputError({ error: false, message: t('invalidIpError') });
            sethrNameInputError({ error: true, message: '' });
        
        } else {
            dispatch(updateGateway({id:values.id,hrName:values.hrName,serialNumber:values.serialNumber,ipV4:values.ipV4, devices:devices}));
        }
    }

    const handleCancel = () => {
        navigate("/gateway/gateways");
    }

    if(values === null )
       return <Loading open={true} />

    return (
        <Container maxWidth={false}>
            <Loading open={status === 'loading' ? true : false}></Loading>
            <ConfirmDialog open={openConfirmDialog} title={t('confirmDeviceDialogTitle')}
                description={t('confirmDeviceDialogDescription')} onClose={handleCloseConfirmDialog}
                onAccept={handleAcceptConfirmDialog} cancelButtonText={t('cancelButtonText')}
                acceptButtonText={t('acceptButtonText')} />

            <ErrorDialog onAccept={handleAcceptErrorDialog} description={t('appendDeviceDialogDescription')} title={t('appendDeviceDialogTitle')} open={openErrorDialog} acceptButtonText={t('acceptButtonText')} />
            <Collapse in={status === 'failed'}>
                <Alert color="error" severity="error"
                    sx={{ mb: 2, backgroundColor: "transparent" }}
                >
                    {error}
                </Alert>
            </Collapse>
            <Collapse in={editedSuccess === true}>
                <Alert color="success" severity="success"
                       sx={{mb: 2, backgroundColor: "transparent"}}
                >
                    {t("editSuccessMessage")}
                </Alert>
            </Collapse>
            <Grid container maxWidth="md" spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Toolbar>
                            <IconButton
                                edge="start" color="inherit" aria-label="Profile" sx={{ mr: 0.5 }}
                            >
                                <AdUnits />
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div">
                                {t("editTitle")}
                            </Typography>
                        </Toolbar>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            error={hrNameInputError.error}
                                            helperText={hrNameInputError.message}
                                            autoComplete="hrname"
                                            name="hrName"
                                            fullWidth
                                            id="hrName"
                                            label={t('hrName')}
                                            onChange={handleHRName}
                                            value={values.hrName}
                                            autoFocus
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            error={serialNumberInputError.error}
                                            helperText={serialNumberInputError.message}
                                            fullWidth
                                            id="serialNumber"
                                            label={t('serialNumber')}
                                            onChange={handleSerialNumber}
                                            name="serialNumber"
                                            value={values.serialNumber}
                                            autoComplete="serialNumber"
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            error={ipV4InputError.error}
                                            helperText={ipV4InputError.message}
                                            fullWidth
                                            id="ipV4"
                                            label={t('ipV4')}
                                            onChange={handleIpV4}
                                            name="ipV4"
                                            value={values.ipV4}
                                            autoComplete="ipV4"
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            error={vendorInputError.error}
                                            helperText={vendorInputError.message}
                                            autoComplete="vendor"
                                            name="vendor"
                                            fullWidth
                                            id="vendor"
                                            label={t('vendor')}
                                            onChange={handleVendor}
                                            value={dvalues.vendor}
                                            autoFocus
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            error={dateInputError.error}
                                            helperText={dateInputError.message}
                                            fullWidth
                                            id="date"
                                            label={t('date')}
                                            onChange={handleDate}
                                            name="date"
                                            value={dvalues.date}
                                            autoComplete="date"
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <FormControlLabel
                                            control={<Checkbox value="online" color="primary"
                                                checked={dvalues.online}
                                                onChange={handleOnline} />}
                                            label={<Typography color="textPrimary"
                                                gutterBottom
                                                variant="body2"> {t('online')}</Typography>}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title={t('addDeviceButtonText')}>
                                            <IconButton onClick={handleNewDevice} color="primary">
                                                <AddCircle sx={{
                                                    fontSize: 40
                                                }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }} />
                            <Search onSearchHandler={handleSearch} options={searchOption} />
                        </Toolbar>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => {
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}>
                                                    {column.label}
                                                </TableCell>);
                                        })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? devices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : devices
                                    ).filter(device => {
                                        if (filter.text == null ||
                                            filter.text == undefined ||
                                            filter.text.length == 0)
                                            return true;
                                        else {
                                            return device[filter.column].includes(filter.text);
                                        }
                                    }
                                    ).map((device, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column) => {

                                                    if (column.id === 'actions') {
                                                        return (
                                                            <TableCell key={column.id} align="center">
                                                                <IconButton align="left" onClick={() => {
                                                                    setSelectedDevice(index);
                                                                    setOpenConfirmDialog(true);

                                                                }}>
                                                                    <DeleteOutlined color="secondary"></DeleteOutlined>
                                                                </IconButton>
                                                            </TableCell>
                                                        );
                                                    }

                                                    const value = column.id == 'online' ? device[column.id] === true ? t("on") : t("off") : device[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>);
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10]}
                            component="div"
                            count={devices.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
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
                                onClick={handleUpdateGateway}
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

export default EditGateway;