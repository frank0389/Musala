import React, { useEffect, useState } from "react";
import { Alert, Avatar, Box, Collapse, Container, IconButton, TablePagination, Toolbar, Tooltip, Typography } from "@mui/material";
import { AddCircle, AdUnits, DeleteOutlined, Edit } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import Grid from '@mui/material/Grid';
import { errorSelector, gatewaysSelector, getGateways, removeGateway, statusSelector, totalItemsSelector } from "../../../core/reducers/gateway";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Loading from "../../../../../components/loading";
import Search from "../../../../../components/table/search";
import ConfirmDialog from "../../../../../components/dialogs/confirm";
import CustomCard from "../../../../../components/card";


const Gateways = (props) => {

    const { t } = useTranslation("gateway");
    const columns = [
        {id: 'id', label: 'ID',  sort: true},
        {id: 'serialNumber', label: t("serialNumber"), sort: true},
        {id: 'hrName', label: t("hrName"), sort: true},
        {id: 'ipV4', label: t('ipV4'), sort: true},
    ];
    const searchOption = [t("serialNumber"), t("hrName"),t("ipV4")];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector(errorSelector);
    const status = useSelector(statusSelector);
    const gateways = useSelector(gatewaysSelector);
    const totalItems = useSelector(totalItemsSelector);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [sort, setSort] = useState({ property: 'id', direction: 'asc' });
    const [filter, setFilter] = useState({ column: '', text: '' });
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedGateway, setSelectedGateway] = React.useState('');


    const handleSearch = (text, option) => {

        if (text === null ||
            text === undefined ||
            text.length === 0) {
            setFilter({column: "", text: ""})
            dispatch(getGateways("", "", page, rowsPerPage, sort));

        } else {
            const column = columns.find(column => column.label === option);
            if (column) {
                setFilter({column: column.id, text: text})
                dispatch(getGateways(column.id, text, page, rowsPerPage, sort));
            }
        }

    }

    const handleNewGateway = () => {
        navigate("/gateway/gateways/new")
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(getGateways(filter.column, filter.text, newPage, rowsPerPage, sort));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        dispatch(getGateways(filter.column, filter.text, 0, event.target.value, sort));
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    }
    const handleAcceptConfirmDialog = () => {
        setOpenConfirmDialog(false);
        dispatch(removeGateway(selectedGateway, filter.column, filter.text, page, rowsPerPage, sort));
    }

    useEffect(
        () => {
            dispatch(getGateways(filter.column, filter.text, page, rowsPerPage, sort));
        }, [])


    return (
        <Container maxWidth={false}>
            <Loading open={status === 'loading' ? true : false}></Loading>
            <ConfirmDialog open={openConfirmDialog} title={t('confirmDialogTitle')}
                           description={t('confirmDialogDescription')} onClose={handleCloseConfirmDialog}
                           onAccept={handleAcceptConfirmDialog} cancelButtonText={t('cancelButtonText')}
                           acceptButtonText={t('acceptButtonText')}/>
            <Collapse in={status === 'failed'}>
                <Alert color="error" severity="error"
                    sx={{ mb: 2, backgroundColor: "transparent" }}
                >
                    {error}
                </Alert>
            </Collapse>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Search onSearchHandler={handleSearch} options={searchOption} />
                <Tooltip title={t('add')}>
                    <IconButton onClick={handleNewGateway} color="primary">
                        <AddCircle sx={{
                            fontSize: 40
                        }} />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            
            <Grid container justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}>
                {
                    gateways.map(gateway => {
                        return (

                            <Grid item md={4} key={gateway.id}  xs={12}>
                                <CustomCard label={gateway.hrName} value={gateway.ipV4} icon={<Avatar
                                    sx={{ height: 75, width: 75, backgroundColor: 'success.main' }}
                                >
                                    <AdUnits sx={{
                                        height: 54,
                                        width: 54
                                    }}/>
                                </Avatar>} description={
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            pt: 2
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mr: 1,
                                                ml: 1
                                            }}
                                        >
                                            {"SN:"+gateway.serialNumber}
                                        </Typography>
                                        <Box sx={{ flexGrow: 1 }} />
                                        <IconButton onClick={() => {
                                            navigate("/gateway/gateways/"+gateway.id);

                                        }}>
                                            <Edit/>
                                        </IconButton>
                                        <IconButton onClick={() => {
                                            setSelectedGateway(gateway.id);
                                            setOpenConfirmDialog(true);

                                        }}>
                                            <DeleteOutlined color="secondary"></DeleteOutlined>
                                        </IconButton>
                                    </Box>
                                } />
                            </Grid>
                    )})
                }
            </Grid>
            <TablePagination 
                rowsPerPageOptions={[6, 9]}
                component="div"
                count={parseInt(totalItems)}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{position: 'fixed', bottom:'10px', right:0}}
            />
        </Container>
    );
}

export default Gateways;