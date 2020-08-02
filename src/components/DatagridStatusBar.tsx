import * as React from "react";
import { IDatagridStatusBar } from "../@interface";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";

const DatagridStatusBar: React.FC<IDatagridStatusBar> = props => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();

  return (
    <div className="ac_datagrid--status_bar">
      Status Bar
      {props.children}
    </div>
  );
};

export default DatagridStatusBar;
