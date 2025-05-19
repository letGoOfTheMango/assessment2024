"use client";
import { createContext, useState, useContext} from "react";
// import { Context } from "./contextInterface";
import defaultAppData from "./AppDefaultData";


export const AppContext = createContext<any>(undefined);


export const AppContextWrapper = ({ children }: { children: React.ReactNode }) => {

    const [appData, setAppData] = useState({...defaultAppData});

    console.log(appData.currentProject);
    return (
        <AppContext.Provider value={[appData, setAppData]}>
            {children}
        </AppContext.Provider>
    );
}
export const useAppContext = () => useContext(AppContext);