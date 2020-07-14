import React, { useRef } from "react";
import { useDatagridContext } from "../context/DatagridContext";
import { IDatagridHeader } from "../@interface";
import HeaderAsidePanel from "./header/HeaderAsidePanel";
import HeaderLeftPanel from "./header/HeaderLeftPanel";
import HeaderMainPanel from "./header/HeaderMainPanel";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";
import { useDatagridLayoutDispatch } from "../context/LayoutContext";

const DatagridHeader: React.FC<IDatagridHeader> = props => {
  const context = useDatagridContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = React.useMemo(() => {
    return { ...props.style, height: context.headerHeight };
  }, [props.style, context.headerHeight]);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    layoutDispatch({
      type: "SET_HEADER_HEIGHT",
      headerHeight: containerRef.current.clientHeight
    });
  }, [props.style, context.headerHeight]);

  return (
    <div ref={containerRef} style={styles} className="ac_datagrid--header">
      <HeaderAsidePanel />
      <HeaderLeftPanel />
      <HeaderMainPanel />
    </div>
  );
};

export default React.memo(DatagridHeader);
