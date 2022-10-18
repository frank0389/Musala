import ReactFlagsSelect from 'react-flags-select';
import {setLocale} from "../../core/reducers/locale"
import { useDispatch,useSelector } from 'react-redux';
import React, {useState} from 'react';

const SwitchTranslation=() => {

    // dispatch and state
    const dispatch = useDispatch()
    const currentLocale = useSelector(state =>
        state.locale.currentLocale);

    const handleChange = (value) => {
        if ("US" ===  value) {
            dispatch(setLocale("en"));
        } else {
            dispatch(setLocale("es"));
        }
    };

    const localeToContryCode =(locale) =>{

        if(locale === "en")
            return "US";
        else
            return "ES";
    };

    return (
        <ReactFlagsSelect
            countries={["US", "ES"]}
            selected={localeToContryCode(currentLocale)}
            onSelect={handleChange}
            showSelectedLabel={false}
            showOptionLabel={false}
            selectedSize={20}
            optionsSize={24}
            selectButtonClassName="buttonSelected"
        />
    );
}

export default SwitchTranslation;