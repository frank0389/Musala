import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";

const IconTextField = ({iconStart, iconEnd, onStartIconClick,onEndIconClick, inputProps, ...props}) => {

    const handleStartIconClick = () => {
        onStartIconClick();
    }

    const handleEndIconClick = () => {
        onEndIconClick();
    }

    const handleMouseDown = (event) => {
        event.preventDefault();
    }

    return (
        <TextField
            {...props}
            InputProps={{
                ... inputProps,
                startAdornment: iconStart? (<InputAdornment position="start">{  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleStartIconClick}
                    onMouseDown={handleMouseDown}
                    edge="end">
                        {iconStart}
                </IconButton>}
                </InputAdornment>
                ):null,
                endAdornment: iconEnd?(<InputAdornment position="end">{
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleEndIconClick}
                        onMouseDown={handleMouseDown}
                        edge="end"> {iconEnd}
                    </IconButton>}
                </InputAdornment>):null
            }}
        />
    );
}

export default IconTextField;