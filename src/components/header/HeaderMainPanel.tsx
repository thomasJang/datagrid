import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import HeaderTable from "./HeaderTable";

interface IProps {
  styleLeft: number;
}
const HeaderMainPanel: React.FC<IProps> = ({ styleLeft }) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();

  if (!context._colGroup || context._colGroup.length < 1) {
    return null;
  }
  const { _headerHeight: height = 0 } = layoutContext;

  return (
    <div className="ac_datagrid--header--main__panel" style={{ height }}>
      <div data-panel={"scroll-content"} style={{ left: styleLeft }}>
        <HeaderTable columns={context._colGroup} />
      </div>
    </div>
  );
};

export default React.memo(HeaderMainPanel);
