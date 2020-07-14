import React, { useEffect } from "react";
import { IDatagridProps, IDatagridContext } from "../@interface";
import getCTXDataByColumns from "../lib/getCTXDataByColumns";
import {
  useDatagridDispatch,
  useDatagridContext
} from "../context/DatagridContext";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";

const Datagrid: React.FC<IDatagridProps> = props => {
  const state = useDatagridContext();
  const dispatch = useDatagridDispatch();

  const { cssClassName = "ac_datagrid" } = state;
  const styles: React.CSSProperties = {
    ...props.style,
    width: props.width,
    height: props.height
  };

  // component didUpdate
  useEffect(() => {
    // make new context
    const nextState: IDatagridContext = {
      ...state,
      ...props
    };

    if (
      state.columns !== nextState.columns ||
      state.enableFrozenCell !== nextState.enableFrozenCell ||
      state.frozenColumnIndex !== nextState.frozenColumnIndex
    ) {
      const {
        _leftColGroup,
        _colGroup,
        _totalWidthOfColumns
      } = getCTXDataByColumns(nextState.columns, {
        containerWidth: nextState.width || 0,
        enableFrozenCell: nextState.enableFrozenCell,
        frozenColumnIndex: nextState.frozenColumnIndex
      });
      nextState._leftColGroup = _leftColGroup;
      nextState._colGroup = _colGroup;
      nextState._totalWidthOfColumns = _totalWidthOfColumns;
      // console.log(
      //     'getCTXData by columns',
      //     _leftColGroup,
      //     _colGroup,
      //     _totalWidthOfColumns,
      // );
    }
    if (state.data !== nextState.data) {
      // console.log('changed or init data');
    }

    dispatch({ type: "SET_STATE", state: nextState });
  }, [
    props.width,
    props.columns,
    props.enableFrozenCell,
    props.frozenColumnIndex
  ]);

  return (
    <div className={cssClassName} style={styles}>
      {props.children}
    </div>
  );
};

export default Datagrid;
