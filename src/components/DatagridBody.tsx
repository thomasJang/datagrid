import React, { useRef } from "react";
import { IDatagridBody } from "@interface";
import BodyAsidePanel from "./body/BodyAsidePanel";
import BodyLeftPanel from "./body/BodyLeftPanel";
import BodyMainPanel from "./body/BodyMainPanel";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/LayoutContext";

const DatagridBody: React.FC<IDatagridBody> = props => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    layoutDispatch({
      type: "SET_BODY_HEIGHT",
      bodyHeight: containerRef.current.clientHeight
    });
  }, [
    props.style,
    context.height,
    context.headerHeight,
    layoutContext._headerHeight
  ]);

  return (
    <div ref={containerRef} style={props.style} className="ac_datagrid--body">
      <BodyAsidePanel />
      <BodyLeftPanel />
      <BodyMainPanel />
    </div>
  );
};

export default DatagridBody;
