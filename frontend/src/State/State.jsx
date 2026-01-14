import { useState } from "react";
import AppContext from "./Context";

function AppState(props){
 return(
    <AppContext.Provider value={{}}>
        {props.children}
    </AppContext.Provider>
 )
}

export default AppState