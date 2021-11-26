import * as React from "react";
import { IDatagridBody, LayoutContextActionTypes } from "../@interface";
import BodyAsidePanel from "./body/BodyAsidePanel";
import BodyLeftPanel from "./body/BodyLeftPanel";
import BodyMainPanel from "./body/BodyMainPanel";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch,
} from "../context/DatagridLayoutContext";

const DatagridBody: React.FC<IDatagridBody> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();

  const { bodyRowHeight = 20, dataLength } = context;
  const {
    _bodyHeight = 1,
    _bodyWidth = 1,
    _scrollTop,
    _scrollLeft,
  } = layoutContext;

  const { startRowIndex, endRowIndex, styleTop } = React.useMemo(() => {
    const displayRowCount = Math.floor(_bodyHeight / bodyRowHeight);
    const startRowIndex = Math.floor(_scrollTop / bodyRowHeight);
    const endRowIndex =
      startRowIndex + displayRowCount > dataLength
        ? dataLength
        : startRowIndex + displayRowCount;

    return {
      startRowIndex,
      endRowIndex,
      styleTop: -(_scrollTop % bodyRowHeight),
    };
  }, [_bodyHeight, bodyRowHeight, dataLength, _scrollTop]);

  const styleLeft = React.useMemo(() => {
    return -_scrollLeft;
  }, [_scrollLeft]);

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      const bodyHeight = containerRef.current.clientHeight;
      const bodyWidth = containerRef.current.clientWidth;
      layoutDispatch({
        type: LayoutContextActionTypes.SET_BODY_DIMENSION,
        bodyHeight,
        bodyWidth,
      });
    }
  }, [props.style, context.height, context.headerHeight]);

  return (
    <div ref={containerRef} className="ac-datagrid--body" style={props.style}>
      <BodyAsidePanel
        startRowIndex={startRowIndex}
        endRowIndex={endRowIndex}
        styleTop={styleTop}
      />
      <BodyLeftPanel />
      <BodyMainPanel
        startRowIndex={startRowIndex}
        endRowIndex={endRowIndex}
        styleTop={styleTop}
        styleLeft={styleLeft}
      />
      {props.children}
    </div>
  );
};

export default DatagridBody;
