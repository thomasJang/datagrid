import * as React from "react";
import { useDatagridContext } from "../context/DatagridContext";
import { IDatagridHeader } from "../@interface";
import HeaderAsidePanel from "./header/HeaderAsidePanel";
import HeaderLeftPanel from "./header/HeaderLeftPanel";
import HeaderMainPanel from "./header/HeaderMainPanel";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";
import {
  SET_HEADER_HEIGHT,
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
        type: SET_HEADER_HEIGHT,
        headerHeight: containerRef.current.clientHeight,
      });
    }
  }, [props.style, context.headerHeight]);

  return (
    <div ref={containerRef} style={styles} className="ac_datagrid--header">
      <HeaderAsidePanel />
      <HeaderLeftPanel />
      <HeaderMainPanel styleLeft={styleLeft} />
      {props.children}
    </div>
  );
};

export default React.memo(DatagridHeader);
