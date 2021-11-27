import * as React from "react";
import {
  IDatagridLayoutContext,
  LayoutContextActionTypes,
} from "../@interface";

export type DatagridLayoutContextAction =
  | { type: LayoutContextActionTypes.SET_STATE; state: IDatagridLayoutContext }
  | { type: LayoutContextActionTypes.SET_HOVER; hover: boolean }
  | {
      type: LayoutContextActionTypes.SET_SCROLL;
      scrollTop: number;
      scrollLeft: number;
    }
  | { type: LayoutContextActionTypes.SET_SCROLL_TOP; scrollTop: number }
  | { type: LayoutContextActionTypes.SET_SCROLL_LEFT; scrollLeft: number }
  | {
      type: LayoutContextActionTypes.SET_LINE_NUMBER_WIDTH;
      lineNumberColumnWidth: number;
    }
  | {
      type: LayoutContextActionTypes.SET_BODY_DIMENSION;
      bodyHeight: number;
      bodyWidth: number;
    }
  | { type: LayoutContextActionTypes.SET_HEADER_HEIGHT; headerHeight: number };

const DatagridLayoutContext =
  React.createContext<IDatagridLayoutContext | null>(null);
const DatagridLayoutDispatchContext =
  React.createContext<React.Dispatch<DatagridLayoutContextAction> | null>(null);

const DatagridLayoutontextReducer = (
  state: IDatagridLayoutContext,
  action: DatagridLayoutContextAction
): IDatagridLayoutContext => {
  switch (action.type) {
    case LayoutContextActionTypes.SET_HOVER:
      return {
        ...state,
        _hover: action.hover,
      };
    case LayoutContextActionTypes.SET_BODY_DIMENSION:
      return {
        ...state,
        _bodyWidth: action.bodyWidth,
        _bodyHeight: action.bodyHeight,
      };
    case LayoutContextActionTypes.SET_HEADER_HEIGHT:
      return {
        ...state,
        _headerHeight: action.headerHeight,
      };
    case LayoutContextActionTypes.SET_SCROLL:
      return {
        ...state,
        _scrollLeft: action.scrollLeft,
        _scrollTop: action.scrollTop,
      };
    case LayoutContextActionTypes.SET_SCROLL_TOP:
      return {
        ...state,
        _scrollTop: action.scrollTop,
      };
    case LayoutContextActionTypes.SET_SCROLL_LEFT:
      return {
        ...state,
        _scrollLeft: action.scrollLeft,
      };
    case LayoutContextActionTypes.SET_LINE_NUMBER_WIDTH:
      return {
        ...state,
        _lineNumberColumnWidth: action.lineNumberColumnWidth,
      };
    case LayoutContextActionTypes.SET_STATE:
      return {
        ...state,
        ...action.state,
      };
    default:
      throw new Error("Unhandled action");
  }
};

// Provider
export function DatagridLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(DatagridLayoutontextReducer, {
    _scrollTop: 0,
    _scrollLeft: 0,
    _hover: false,
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
  const state = React.useContext(DatagridLayoutContext);
  if (!state) throw new Error("Cannot find DatagridLayoutContextProvider");
  return state;
}

export function useDatagridLayoutDispatch() {
  const dispatch = React.useContext(DatagridLayoutDispatchContext);
  if (!dispatch) throw new Error("Cannot find DatagridLayoutContextProvider");
  return dispatch;
}
