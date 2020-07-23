import React, { useReducer, useContext, createContext, Dispatch } from "react";
import { IDatagridLayoutContext } from "../@interface";
export type DatagridLayoutContextAction =
  | { type: "SET_HOVER"; hover: boolean }
  | { type: "SET_SCROLL"; scrollTop: number; scrollLeft: number }
  | { type: "SET_SCROLL_TOP"; scrollTop: number }
  | { type: "SET_SCROLL_LEFT"; scrollLeft: number }
  | { type: "SET_LINE_NUMBER_WIDTH"; lineNumberColumnWidth: number }
  | {
      type: "SET_BODY_DIMENSION";
      bodyHeight: number;
      bodyWidth: number;
    }
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
    case "SET_HOVER":
      return {
        ...state,
        _hover: action.hover
      };
    case "SET_BODY_DIMENSION":
      return {
        ...state,
        _bodyWidth: action.bodyWidth,
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
    case "SET_SCROLL_TOP":
      return {
        ...state,
        _scrollTop: action.scrollTop
      };
    case "SET_SCROLL_LEFT":
      return {
        ...state,
        _scrollLeft: action.scrollLeft
      };
    case "SET_LINE_NUMBER_WIDTH":
      return {
        ...state,
        _lineNumberColumnWidth: action.lineNumberColumnWidth
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
    _scrollLeft: 0,
    _hover: false
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
