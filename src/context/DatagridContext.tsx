import * as React from "react";
import { ContextActionTypes, IDatagridContext } from "../@interface";

export type DatagridContextAction = {
  type: ContextActionTypes.SET_STATE;
  state: IDatagridContext;
};

const DatagridContext = React.createContext<IDatagridContext | null>(null);
const DatagridDispatchContext = React.createContext<React.Dispatch<
  DatagridContextAction
> | null>(null);

const DatagridContextReducer = (
  state: IDatagridContext,
  action: DatagridContextAction
): IDatagridContext => {
  switch (action.type) {
    case ContextActionTypes.SET_STATE:
      return {
        ...state,
        ...action.state,
        _ready: true
      };
    default:
      throw new Error("Unhandled action");
  }
};

// Provider
export function DatagridProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(DatagridContextReducer, {
    _ready: false,
    width: 0,
    height: 0,
    columns: [],
    data: [],
    dataLength: 0,
    bodyRowHeight: 20,
    headerHeight: 20
  });

  return (
    <DatagridContext.Provider value={state}>
      <DatagridDispatchContext.Provider value={dispatch}>
        {children}
      </DatagridDispatchContext.Provider>
    </DatagridContext.Provider>
  );
}

export function useDatagridContext() {
  const state = React.useContext(DatagridContext);
  if (!state) throw new Error("Cannot find DatagridContextProvider");
  return state;
}

export function useDatagridDispatch() {
  const dispatch = React.useContext(DatagridDispatchContext);
  if (!dispatch) throw new Error("Cannot find DatagridContextProvider");
  return dispatch;
}
