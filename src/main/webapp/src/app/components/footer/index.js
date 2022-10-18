import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {useTranslation} from "react-i18next";

const Footer = (props) => {
    const { t } = useTranslation("footer");

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href={process.env.ORG_URL}>
                {t('organization')}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Footer;