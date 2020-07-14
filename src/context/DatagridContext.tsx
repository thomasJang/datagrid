import React, { useReducer, useContext, createContext, Dispatch } from "react";
import { IDatagridContext } from "../@interface";
export type DatagridContextAction =
  | { type: "SET_BODY_HEIGHT"; bodyHeight: number }
  | { type: "SET_HEADER_HEIGHT"; headerHeight: number }
  | { type: "SET_STATE"; state: IDatagridContext };

const DatagridContext = createContext<IDatagridContext | null>(null);
const DatagridDispatchContext = createContext<Dispatch<
  DatagridContextAction
> | null>(null);

const DatagridContextReducer = (
  state: IDatagridContext,
  action: DatagridContextAction
): IDatagridContext => {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        ...action.state
      };
    default:
      throw new Error("Unhandled action");
  }
};

// Provider
export function DatagridProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(DatagridContextReducer, {});

  return (
    <DatagridContext.Provider value={state}>
      <DatagridDispatchContext.Provider value={dispatch}>
        {children}
      </DatagridDispatchContext.Provider>
    </DatagridContext.Provider>
  );
}

export function useDatagridContext() {
  const state = useContext(DatagridContext);
  if (!state) throw new Error("Cannot find DatagridContextProvider");
  return state;
}

export function useDatagridDispatch() {
  const dispatch = useContext(DatagridDispatchContext);
  if (!dispatch) throw new Error("Cannot find DatagridContextProvider");
  return dispatch;
}
