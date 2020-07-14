import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/LayoutContext";

interface IProps {}
const BodyAsidePanel: React.FC<IProps> = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;

  if (!context.enableLineNumber) {
    return null;
  }

  return (
    <div
      className="ac_datagrid--header--aside__panel"
      style={{ width: context.lineNumberColumnWidth, height }}
    >
      &nbsp;
    </div>
  );
};

export default React.memo(BodyAsidePanel);
