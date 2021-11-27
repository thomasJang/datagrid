import * as React from "react";
import {
  ContextActionTypes,
  IDatagridContext,
  IDatagridProps,
  LayoutContextActionTypes,
} from "../@interface";
import getCTXDataByColumns from "../lib/getCTXDataByColumns";
import {
  useDatagridContext,
  useDatagridDispatch,
} from "../context/DatagridContext";
import {
  DatagridLayoutContextAction,
  useDatagridLayoutContext,
  useDatagridLayoutDispatch,
} from "../context/DatagridLayoutContext";
import debounce from "lodash.debounce";
import CanvasContext from "../lib/CanvasContext";

const Datagrid: React.FC<IDatagridProps> = (props) => {
  const {
    children,
    height,
    columns,
    scrollTop,
    scrollLeft,
    dataLength,
    style,
    width,
    enableFrozenCell,
    frozenColumnIndex,
    theme,
  } = props;
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const dispatch = useDatagridDispatch();
  const layoutDispatch = useDatagridLayoutDispatch();

  const { cssClassName = `ac-datagrid ${theme}` } = context;
  const styles: React.CSSProperties = {
    ...style,
    width,
    height,
  };

  const { current: debouncedLayoutDispatch } = React.useRef(
    debounce<(action: DatagridLayoutContextAction) => void>((action) => {
      layoutDispatch(action);
    }, 300)
  );

  const handleMouseEnter: React.MouseEventHandler = () => {
    debouncedLayoutDispatch.cancel?.();
    debouncedLayoutDispatch({
      type: LayoutContextActionTypes.SET_HOVER,
      hover: true,
    });
  };
  const handleMouseLeave: React.MouseEventHandler = () => {
    debouncedLayoutDispatch.cancel?.();
    debouncedLayoutDispatch({
      type: LayoutContextActionTypes.SET_HOVER,
      hover: false,
    });
  };

  // component didUpdate
  React.useEffect(() => {
    // make new context
    const nextState: IDatagridContext = {
      ...context,
      ...props,
    };

    if (
      context.columns !== nextState.columns ||
      context.enableFrozenCell !== nextState.enableFrozenCell ||
      context.frozenColumnIndex !== nextState.frozenColumnIndex
    ) {
      const {
        _leftColGroup,
        _colGroup,
        _totalWidthOfColumns,
      } = getCTXDataByColumns(nextState.columns, {
        containerWidth: nextState.width || 0,
        enableFrozenCell: nextState.enableFrozenCell,
        frozenColumnIndex: nextState.frozenColumnIndex,
      });
      nextState._leftColGroup = _leftColGroup;
      nextState._colGroup = _colGroup;
      nextState._totalWidthOfColumns = _totalWidthOfColumns;
      // console.log(
      //   "getCTXData by columns",
      //   _leftColGroup,
      //   _colGroup,
      //   _totalWidthOfColumns
      // );
    }
    if (context.data !== nextState.data) {
      // console.log("changed or init data");
    }

    dispatch({ type: ContextActionTypes.SET_STATE, state: nextState });
  }, [width, columns, enableFrozenCell, frozenColumnIndex]);

  React.useEffect(() => {
    const lineNumberColumnWidth = Math.max(
      CanvasContext.measureText("" + (dataLength || 0)) + 14,
      50
    );

    layoutDispatch({
      type: LayoutContextActionTypes.SET_LINE_NUMBER_WIDTH,
      lineNumberColumnWidth,
    });
  }, [dataLength, layoutDispatch]);

  React.useEffect(() => {
    if (
      layoutContext._scrollTop !== scrollTop ||
      layoutContext._scrollLeft !== scrollLeft
    ) {
      let {
        scrollTop = layoutContext._scrollTop,
        scrollLeft = layoutContext._scrollLeft,
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

      if (scrollLeft < 0) {
        scrollLeft = 0;
      } else if (
        (context._totalWidthOfColumns || 0) - scrollLeft <
        (layoutContext._contentScrollContainerWidth || 0)
      ) {
        scrollLeft =
          (context._totalWidthOfColumns || 0) -
          (layoutContext._contentScrollContainerWidth || 0);
      }

      layoutDispatch({
        type: LayoutContextActionTypes.SET_SCROLL,
        scrollTop,
        scrollLeft,
      });
    }
  }, [scrollTop, scrollLeft]);

  if (!context._ready) {
    return null;
  }

  return (
    <div
      tabIndex={-1}
      className={cssClassName}
      style={styles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default Datagrid;
