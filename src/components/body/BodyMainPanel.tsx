import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import BodyTable from "./BodyTable";

interface IProps {
  startRowIndex: number;
  endRowIndex: number;
}
const BodyMainPanel: React.FC<IProps> = ({ startRowIndex, endRowIndex }) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;
  const { width: width } = context;

  if (!context._colGroup || context._colGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac_datagrid--body--main__panel" style={{ width, height }}>
      <div data-panel={"scroll-content"}>
        <BodyTable
          columns={context._colGroup}
          startRowIndex={startRowIndex}
          endRowIndex={endRowIndex}
        />
      </div>
    </div>
  );
};

export default React.memo(BodyMainPanel);
