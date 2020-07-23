import React, { useRef, useEffect, useMemo } from "react";
import { IDatagridBody } from "@interface";
import BodyAsidePanel from "./body/BodyAsidePanel";
import BodyLeftPanel from "./body/BodyLeftPanel";
import BodyMainPanel from "./body/BodyMainPanel";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";

const DatagridBody: React.FC<IDatagridBody> = props => {
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();

  const { bodyRowHeight = 20, dataLength } = context;
  const {
    _bodyHeight = 1,
    _bodyWidth = 1,
    _scrollTop,
    _scrollLeft
  } = layoutContext;

  const { startRowIndex, endRowIndex, styleTop } = useMemo(() => {
    const displayRowCount = Math.floor(_bodyHeight / bodyRowHeight);
    const startRowIndex = Math.floor(_scrollTop / bodyRowHeight);
    const endRowIndex =
      startRowIndex + displayRowCount > dataLength
        ? dataLength
        : startRowIndex + displayRowCount;

    return {
      startRowIndex,
      endRowIndex,
      styleTop: -(_scrollTop % bodyRowHeight)
    };
  }, [_bodyHeight, bodyRowHeight, dataLength, _scrollTop]);

  const { styleLeft } = useMemo(() => {
    const styleLeft = -_scrollLeft;
    return {
      styleLeft
    };
  }, [_bodyWidth, _scrollLeft, context._totalWidthOfColumns]);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const bodyHeight = containerRef.current.clientHeight;
    const bodyWidth = containerRef.current.clientWidth;

    layoutDispatch({
      type: "SET_BODY_DIMENSION",
      bodyHeight,
      bodyWidth
    });
  }, [props.style, context.height, context.headerHeight]);

  return (
    <div ref={containerRef} style={props.style} className="ac_datagrid--body">
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
