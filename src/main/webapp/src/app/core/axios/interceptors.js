import axios from 'axios';
import {ACCESS_TOKEN,LOCALE} from "../utils/constants";

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.SERVER_API_URL;

const setUpAxiosInterceptors = onUnauthenticated => {
    const onRequestSuccess = config => {
        const token =  localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const locale = localStorage.getItem(LOCALE) || sessionStorage.getItem(LOCALE);
        if (locale) {
            config.headers["Accept-Language"] = locale;
        }
        return config;
    };

    const onResponseSuccess = response => response;

    const onResponseError = err => {
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401) {
            onUnauthenticated();
        }
       return Promise.reject(err);
    };

    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setUpAxiosInterceptors;