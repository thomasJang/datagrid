import * as React from "react";
import {
    IDatagridThemeContext,
    ThemeContextActionTypes
} from "../@interface";

export type DatagridThemeContextAction = {
    type: ThemeContextActionTypes.SET_THEME;
    theme: string;
}

const DatagridThemeContext = React.createContext<IDatagridThemeContext | null>(null);
const DatagridThemeDispatchContext = React.createContext<React.Dispatch<DatagridThemeContextAction> | null>(
    null
);


const DatagridThemeContextReducer = (
    state: IDatagridThemeContext,
    action: DatagridThemeContextAction
): IDatagridThemeContext => {
    switch (action.type) {
        case ThemeContextActionTypes.SET_THEME:
            return {
                ...state,
                _theme: action.theme
            };
        default:
            throw new Error("Unhandled action");
    }
};

// Provider
export function DatagridThemeProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(DatagridThemeContextReducer, {
        _theme: 'normal'
    });

    return (
        <DatagridThemeContext.Provider value={state}>
            <DatagridThemeDispatchContext.Provider value={dispatch}>
                {children}
            </DatagridThemeDispatchContext.Provider>
        </DatagridThemeContext.Provider>
    );
}

export function useDatagridThemeContext() {
    const state = React.useContext(DatagridThemeContext);
    if (!state) throw new Error("Cannot find DatagridContextProvider");
    return state;
}

export function useDatagridThemeDispatch() {
    const dispatch = React.useContext(DatagridThemeDispatchContext);
    if (!dispatch) throw new Error("Cannot find DatagridContextProvider");
    return dispatch;
}
