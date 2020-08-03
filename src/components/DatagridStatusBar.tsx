import * as React from "react";
import { IDatagridStatusBar } from "../@interface";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";
import DatagridHorizontalScroller from "./DatagridHorizontalScroller";

const DatagridStatusBar: React.FC<IDatagridStatusBar> = props => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();

  const styles = React.useMemo(() => {
    return { ...props.style, height: context.statusBarHeight };
  }, [props.style, context.statusBarHeight]);

  return (
    <div className="ac-datagrid--status-bar" style={styles}>
      <div className="ac-datagrid--status-bar--holder">
        {props.children}
      </div>
      {props.showScroller && <div className="ac-datagrid--status-bar--scroller">
        <DatagridHorizontalScroller size={props.scrollerSize} />
      </div>}
    </div>
  );
};

export default DatagridStatusBar;
