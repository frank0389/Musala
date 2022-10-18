import React  from "react";
import {LayoutStateContext} from "../contexts/layout";

const useLayoutState = () => {
    const context = React.useContext(LayoutStateContext);
    if (context === undefined) {
        throw new Error("useLayoutState must be used within a LayoutProvider");
    }
    return context;
}

export default  useLayoutState;