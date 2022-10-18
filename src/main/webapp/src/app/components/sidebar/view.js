import * as React from 'react';
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Item from "./item";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {accountSelector} from "../../core/reducers/authentication";

const ModuleItem = (props) => {

    const {name, userRoles, items} = props;
    const {t} = useTranslation(name);

    const renderItems = (items, userRoles) => (
        items.filter((item) => item?.allowedRoles?.find(role => userRoles?.includes(role))).map((item) => (
                <Item key={item.id} id={item.id} icon={item.icon} text={t(item.text)} link={item.path}/>
            )
        )
    );

    return (
        <div key={name}>
            <Divider/>
            <List>
                < ListSubheader inset> {t(name)} < / ListSubheader>
                {renderItems(items, userRoles)}
            </List>
        </div>
    );
};

const View = (props) => {
    const {
        modules,
        ...other
    } = props;

    const account = useSelector(accountSelector);


    const renderModule = (module) => {
        return (
            <ModuleItem items={module.sidebar} userRoles={account.roles} key={module.name}
                        name={module.name}></ModuleItem>
        );
    };

    const renderModules = (modules) => (
        modules.filter(module => module?.allowedRoles?.find(role => account?.roles?.includes(role))).map((module) => {
            return renderModule(module)
        })
    );


    return (
        <div>
            {renderModules(modules)}
        </div>);
}

export default View;