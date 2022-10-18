import authentication from './authentication';
import locale from "./locale";
import theme from "./theme";
import profile from "./profile"
import modules from "../../modules";

let reducers = [
    authentication,
    locale,
    theme,
    profile
]

//load reducers from modules
modules.map(module => {
      module.reducers?.map(reducer => reducers.push(reducer))

})


const rootReducer = {
};

reducers.map( reducer => {
    let name = reducer.name;
    rootReducer[name] = reducer.reducer;
})


export default rootReducer;