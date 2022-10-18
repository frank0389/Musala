import React, {useEffect, useState} from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    errorSelector,
    getUsers, removeUser,
    statusSelector,
    totalItemsSelector,
    usersSelector
} from "../../../core/reducers/users";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {AddCircle, DeleteOutlined, Edit} from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {Collapse, TableSortLabel} from "@mui/material";
import {visuallyHidden} from '@mui/utils';
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router";


import Loading from "../../../../../components/loading";
import Search from "../../../../../components/table/search";
import ConfirmDialog from "../../../../../components/dialogs/confirm";
import {accountSelector} from "../../../../../core/reducers/authentication";

const UsersView = (props) => {

    const {t} = useTranslation("user");

    const columns = [
        {id: 'id', label: 'ID', minWidth: 100, sort: true},
        {id: 'userName', label: t('column.user'), minWidth: 100, sort: true},
        {id: 'firstName', label: t('column.firstName'), minWidth: 100, sort: true},
        {id: 'lastName', label: t('column.lastName'), minWidth: 100, sort: true},
        {id: 'roles', label: t('column.roles'), minWidth: 100, sort: false},
        {id: 'actions', label: t('column.actions'), minWidth: 100, align: 'center', sort: false}
    ];

    const searchOption = [t('column.user'), t('column.firstName'), t('column.lastName')];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector(errorSelector);
    const status = useSelector(statusSelector);
    const account = useSelector(accountSelector);
    const users = useSelector(usersSelector);
    const totalItems = useSelector(totalItemsSelector);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sort, setSort] = useState({property: 'id', direction: 'asc'});
    const [filter, setFilter] = useState({column: '', text: ''});
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [selectedUser, setSelectedUser] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(getUsers(filter.column, filter.text, newPage, rowsPerPage, sort));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        dispatch(getUsers(filter.column, filter.text, 0, event.target.value, sort));
    };

    const handleSort = (column) => (event) => {
        const isAsc = sort.direction === 'asc';
        const direction = isAsc ? 'desc' : 'asc';
        setSort({property: column, direction: direction});
        dispatch(getUsers(filter.column, filter.text, page, rowsPerPage, sort));
    };

    const handleSearch = (text, option) => {

        if (text === null ||
            text === undefined ||
            text.length === 0) {
            setFilter({column: "", text: ""})
            dispatch(getUsers("", "", page, rowsPerPage, sort));

        } else {
            const column = columns.find(column => column.label === option);
            if (column) {
                setFilter({column: column.id, text: text})
                dispatch(getUsers(column.id, text, page, rowsPerPage, sort));
            }
        }

    }

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    }

    const handleAcceptConfirmDialog = () => {
        setOpenConfirmDialog(false);
        if (account.userName !== selectedUser) {
            if (selectedUser !== 'admin') {
                dispatch(removeUser(selectedUser, filter.column, filter.text, page, rowsPerPage, sort));

            } else {
                //Show error message
            }
        } else {
            //Show error message
        }
    }

    const handleNewUser = () => {
        navigate("/admin/users/new");
    }


    useEffect(
        () => {
            dispatch(getUsers(filter.column, filter.text, page, rowsPerPage, sort));
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
                       sx={{mb: 2, backgroundColor: "transparent"}}
                >
                    {error}
                </Alert>
            </Collapse>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <Toolbar>
                    <Box sx={{flexGrow: 1}}/>
                    <Search onSearchHandler={handleSearch} options={searchOption}/>
                    <Tooltip title={t('add')}>
                        <IconButton onClick={handleNewUser} color="primary">
                            <AddCircle sx={{
                                fontSize: 40
                                }}/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => {

                                    if (column.sort === true) {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sortDirection={sort.property === column.id ? sort.direction : false}
                                            >
                                                <TableSortLabel
                                                    active={sort.property === column.id}
                                                    direction={sort.property === column.id ? sort.direction : 'asc'}
                                                    onClick={handleSort(column.id)}
                                                >
                                                    {t(column.label)}
                                                    {sort.property === column.id ? (
                                                        <Box component="span" sx={visuallyHidden}>
                                                            {sort.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                        </Box>
                                                    ) : null}
                                                </TableSortLabel>
                                            </TableCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}>
                                                {column.label}
                                            </TableCell>);
                                    }
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map(user => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={user.userName}>
                                            {columns.map((column) => {

                                                if (column.id === 'actions') {
                                                    return (
                                                        <TableCell key={column.id} align="center">
                                                            <IconButton disabled={user.userName ==='admin'?true:false} sx={{ml: 2}} color="inherit" onClick={() => {
                                                                setSelectedUser(user.userName);
                                                                navigate("/admin/users/"+user.userName);

                                                            }}>
                                                                <Edit></Edit>
                                                            </IconButton>
                                                            <IconButton  disabled={user.userName ==='admin'?true:user.userName === account.userName?true:false} align="left" onClick={() => {
                                                                setSelectedUser(user.userName);
                                                                setOpenConfirmDialog(true);

                                                            }}>
                                                                <DeleteOutlined color="secondary"></DeleteOutlined>
                                                            </IconButton>
                                                        </TableCell>
                                                    );
                                                }

                                                const value = column.id === "roles" ? user[column.id].join() : user[column.id];
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
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={parseInt(totalItems)}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}

export default UsersView;