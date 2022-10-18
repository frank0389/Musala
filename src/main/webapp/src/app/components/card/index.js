import { Card, CardContent, Grid, Typography } from '@mui/material';

const CustomCard = (props) => {
    const {
        label,
        value,
        icon,
        description,
        ...other
    } = props;
  return (
        <Card >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        {label}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                       {value}
                    </Typography>
                    </Grid>
                    <Grid item>
                     {icon}
                    </Grid>
                </Grid>
                    {description}
        </CardContent>
  </Card>)
};


export default CustomCard;