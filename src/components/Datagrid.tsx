import React, { useCallback, useEffect, useRef } from "react";
import { IDatagridProps, IDatagridContext } from "../@interface";
import getCTXDataByColumns from "../lib/getCTXDataByColumns";
import {
  useDatagridDispatch,
  useDatagridContext
} from "../context/DatagridContext";
import {
  DatagridLayoutContextAction,
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";
import debounce from "lodash.debounce";

const Datagrid: React.FC<IDatagridProps> = props => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const dispatch = useDatagridDispatch();
  const layoutDispatch = useDatagridLayoutDispatch();

  const { cssClassName = "ac_datagrid" } = context;
  const styles: React.CSSProperties = {
    ...props.style,
    width: props.width,
    height: props.height
  };

  const debouncedLayoutDispatch = useRef(
    debounce<(action: DatagridLayoutContextAction) => void>(action => {
      layoutDispatch(action);
    }, 300)
  );

  const handleMouseEnter: React.MouseEventHandler = () => {
    debouncedLayoutDispatch.current({ type: "SET_HOVER", hover: true });
  };
  const handleMouseLeave: React.MouseEventHandler = () => {
    debouncedLayoutDispatch.current({ type: "SET_HOVER", hover: false });
  };

  // component didUpdate
  useEffect(() => {
    // make new context
    const nextState: IDatagridContext = {
      ...context,
      ...props
    };

    if (
      context.columns !== nextState.columns ||
      context.enableFrozenCell !== nextState.enableFrozenCell ||
      context.frozenColumnIndex !== nextState.frozenColumnIndex
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
    if (context.data !== nextState.data) {
      // console.log('changed or init data');
    }

    dispatch({ type: "SET_STATE", state: nextState });
  }, [
    props.width,
    props.columns,
    props.enableFrozenCell,
    props.frozenColumnIndex
  ]);

  useEffect(() => {
    if (
      layoutContext._scrollTop !== props.scrollTop ||
      layoutContext._scrollLeft !== props.scrollLeft
    ) {
      let {
        scrollTop = layoutContext._scrollTop,
        scrollLeft = layoutContext._scrollLeft
      } = props;

      if (scrollTop < 0) {
        scrollTop = 0;
      } else if (
        context.dataLength * (context.bodyRowHeight || 0) - scrollTop <
        (layoutContext._bodyHeight || 0)
      ) {
        scrollTop =
          context.dataLength * (context.bodyRowHeight || 0) -
          (layoutContext._bodyHeight || 0);
      }

      layoutDispatch({ type: "SET_SCROLL", scrollTop, scrollLeft });
    }
  }, [props.scrollTop, props.scrollLeft]);

  if (!context._ready) {
    return null;
  }

  return (
    <div
      className={cssClassName}
      style={styles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </div>
  );
};

export default Datagrid;
