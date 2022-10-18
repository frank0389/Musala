
const  handleError = (error) => {

    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        return error.response.data;

    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        return {message:error.message};
    } else {
        // Something happened in setting up the request and triggered an Error
        return error.message;
    }
}

export default handleError;

