import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {LayoutProvider} from "./app/core/contexts/layout";
import {Provider} from "react-redux";
import store from "./app/core/store";
import bindActionCreators from "react-redux/lib/utils/bindActionCreators";
import {clearAuthentication} from "./app/core/reducers/authentication";
import setUpAxiosInterceptors from "./app/core/axios/interceptors";

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setUpAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

ReactDOM.render(
    <LayoutProvider>
                <Provider store={store}>
                   <App />
                </Provider>
    </LayoutProvider>,
  document.getElementById('root')
);
