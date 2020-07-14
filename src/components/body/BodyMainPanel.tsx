import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/LayoutContext";
import BodyTable from "./BodyTable";

interface IProps {}
const BodyMainPanel: React.FC<IProps> = ({}) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;

  if (!context._colGroup || context._colGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac_datagrid--body--main__panel" style={{ height }}>
      <BodyTable columns={context._colGroup} />
    </div>
  );
};

export default React.memo(BodyMainPanel);
