import * as React from "react";
import {
  IDatagridFilterContext,
  FilterContextActionTypes,
  IData,
} from "../@interface";

export type DatagridFilterContextAction = |
{
  type: FilterContextActionTypes.SET_FILTER;
  isFiltered: boolean;
  filteredData: IData;
  filteredDataLength: number;
}
|
{
  type: FilterContextActionTypes.SET_STATE;
  state: IDatagridFilterContext;
};

const DatagridFilterContext = React.createContext<IDatagridFilterContext | null>(
  null
);
const DatagridFilterDispatchContext = React.createContext<React.Dispatch<DatagridFilterContextAction> | null>(
  null
);

const DatagridFilterContextReducer = (
  state: IDatagridFilterContext,
  action: DatagridFilterContextAction
): IDatagridFilterContext => {
  console.log(action);
  switch (action.type) {
    case FilterContextActionTypes.SET_FILTER:
      return {
        ...state,
        _isFiltered: action.isFiltered,
        _filteredData: action.filteredData,
        _filteredDataLength: action.filteredDataLength
      };
    case FilterContextActionTypes.SET_STATE:
      return {
        ...state,
        ...action.state
      }
    default:
      throw new Error("Unhandled action");
  }
};

// Provider
export function DatagridFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(DatagridFilterContextReducer, {
    _isFiltered: false,
    _filteredData: [],
    _filteredDataLength: 0,
  });

  return (
    <DatagridFilterContext.Provider value={state}>
      <DatagridFilterDispatchContext.Provider value={dispatch}>
        {children}
      </DatagridFilterDispatchContext.Provider>
    </DatagridFilterContext.Provider>
  );
}

export function useDatagridFilterContext() {
  const state = React.useContext(DatagridFilterContext);
  if (!state) throw new Error("Cannot state DatagridContextProvider");
  return state;
}

export function useDatagridFilterDispatch() {
  const dispatch = React.useContext(DatagridFilterDispatchContext);
  if (!dispatch) throw new Error("Cannot dispath DatagridContextProvider");
  return dispatch;
}
