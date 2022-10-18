import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {debounce} from "lodash";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {FilterAlt} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import SelectOptionDialog from "../../dialogs/select";
import {useTranslation} from "react-i18next";

const StyledSearch = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Search = (props) => {
    const { onSearchHandler, options} = props;

    const {t} = useTranslation('search');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(options.length?options[0]:'');

    const handleSearch = debounce((event) => {
        onSearchHandler(event.target.value, selectedOption);
    }, 500);

    const handleOption = () => {
           setOpenDialog(true);
    }

    const handleCancelButton = () => {
        setOpenDialog(false);
    }

    const handleAcceptButton = (value) =>  {
        setSelectedOption(value);
        setOpenDialog(false);
    }

    return (
        <Box sx={{ display: "flex" }}>
            <SelectOptionDialog onCancel={handleCancelButton} onAccept={handleAcceptButton}  valueProp={selectedOption}
                                options={options} title={t('dialog.title')} open={openDialog}
                                cancelButtonText={t('dialog.cancelButtonText')} acceptButtonText={t('dialog.acceptButtonText')}></SelectOptionDialog>
                <StyledSearch>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder={t("placeholder")+" "+selectedOption}
                        inputProps={{'aria-label': 'search'}}
                        onChange={handleSearch}
                    />
                </StyledSearch>
                <Tooltip title="Filter">
                    <IconButton onClick={handleOption}>
                        <FilterAlt/>
                    </IconButton>
                </Tooltip>
        </Box>
    );

}

export default Search;