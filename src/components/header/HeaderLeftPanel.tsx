import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import HeaderTable from "./HeaderTable";

interface IProps {}
const HeaderLeftPanel: React.FC<IProps> = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();

  if (!context._leftColGroup || context._leftColGroup.length < 1) {
    return null;
  }
  const { _headerHeight: height = 0 } = layoutContext;

  return (
    <div className="ac_datagrid--header--left_panel" style={{ height }}>
      <HeaderTable columns={context._leftColGroup} />
    </div>
  );
};

export default React.memo(HeaderLeftPanel);
