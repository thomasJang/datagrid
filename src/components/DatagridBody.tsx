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
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const { bodyRowHeight = 20, dataLength } = context;
  const { _bodyHeight = 20, _scrollTop } = layoutContext;

  const { startRowIndex, endRowIndex, styleTop } = React.useMemo(() => {
    const displayRowCount = Math.floor(_bodyHeight / bodyRowHeight);
    const startRowIndex = Math.floor(_scrollTop / bodyRowHeight);
    const endRowIndex =
      startRowIndex + displayRowCount > dataLength
        ? dataLength
        : startRowIndex + displayRowCount;
    const styleTop = -(_scrollTop % bodyRowHeight);

    return {
      startRowIndex,
      endRowIndex,
      styleTop
    };
  }, [_bodyHeight, bodyRowHeight, dataLength, _scrollTop]);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    layoutDispatch({
      type: "SET_BODY_HEIGHT",
      bodyHeight: containerRef.current.clientHeight
    });
  }, [props.style, context.height, context.headerHeight]);

  return (
    <div ref={containerRef} style={props.style} className="ac_datagrid--body">
      <BodyAsidePanel />
      <BodyLeftPanel />
      <BodyMainPanel
        startRowIndex={startRowIndex}
        endRowIndex={endRowIndex}
        styleTop={styleTop}
      />
      {props.children}
    </div>
  );
};

export default DatagridBody;
