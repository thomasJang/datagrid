import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import BodyTable from "./BodyTable";

interface IProps {}
const BodyLeftPanel: React.FC<IProps> = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;

  if (!context._leftColGroup || context._leftColGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac_datagrid--header--left_panel" style={{ height }}></div>
  );
};

export default React.memo(BodyLeftPanel);
