import React, { useReducer, useContext, createContext, Dispatch } from "react";
import { IDatagridLayoutContext } from "../@interface";
export type DatagridLayoutContextAction =
  | { type: "SET_SCROLL"; scrollTop: number; scrollLeft: number }
  | { type: "SET_BODY_HEIGHT"; bodyHeight: number }
  | { type: "SET_HEADER_HEIGHT"; headerHeight: number };

const DatagridLayoutContext = createContext<IDatagridLayoutContext | null>(
  null
);
const DatagridLayoutDispatchContext = createContext<Dispatch<
  DatagridLayoutContextAction
> | null>(null);

const DatagridLayoutontextReducer = (
  state: IDatagridLayoutContext,
  action: DatagridLayoutContextAction
): IDatagridLayoutContext => {
  switch (action.type) {
    case "SET_BODY_HEIGHT":
      return {
        ...state,
        _bodyHeight: action.bodyHeight
      };
    case "SET_HEADER_HEIGHT":
      return {
        ...state,
        _headerHeight: action.headerHeight
      };
    case "SET_SCROLL":
      return {
        ...state,
        _scrollLeft: action.scrollLeft,
        _scrollTop: action.scrollTop
      };
    default:
      throw new Error("Unhandled action");
  }
};

// Provider
export function DatagridLayoutProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(DatagridLayoutontextReducer, {
    _scrollTop: 0,
    _scrollLeft: 0
  });

  return (
    <DatagridLayoutContext.Provider value={state}>
      <DatagridLayoutDispatchContext.Provider value={dispatch}>
        {children}
      </DatagridLayoutDispatchContext.Provider>
    </DatagridLayoutContext.Provider>
  );
}

export function useDatagridLayoutContext() {
  const state = useContext(DatagridLayoutContext);
  if (!state) throw new Error("Cannot find DatagridLayoutContextProvider");
  return state;
}

export function useDatagridLayoutDispatch() {
  const dispatch = useContext(DatagridLayoutDispatchContext);
  if (!dispatch) throw new Error("Cannot find DatagridLayoutContextProvider");
  return dispatch;
}
