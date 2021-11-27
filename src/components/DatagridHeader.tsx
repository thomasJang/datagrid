import * as React from "react";
import { useDatagridContext } from "../context/DatagridContext";
import { IDatagridHeader, LayoutContextActionTypes } from "../@interface";
import HeaderLeftPanel from "./header/HeaderLeftPanel";
import HeaderMainPanel from "./header/HeaderMainPanel";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch,
} from "../context/DatagridLayoutContext";

const DatagridHeader: React.FC<IDatagridHeader> = (props) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const styles = React.useMemo(() => {
    return { ...props.style, height: context.headerHeight };
  }, [props.style, context.headerHeight]);

  const styleLeft = React.useMemo(() => {
    return -layoutContext._scrollLeft;
  }, [layoutContext._scrollLeft]);

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      layoutDispatch({
        type: LayoutContextActionTypes.SET_HEADER_HEIGHT,
        headerHeight: containerRef.current.clientHeight,
      });
    }
  }, [props.style, context.headerHeight]);

  return (
    <div ref={containerRef} className="ac-datagrid--header" style={styles}>
      <HeaderLeftPanel />
      <HeaderMainPanel />
      {props.children}
    </div>
  );
};

export default React.memo(DatagridHeader);
