import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";

interface IProps {}
const HeaderAsidePanel: React.FC<IProps> = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();

  if (!context.enableLineNumber) {
    return null;
  }
  const { _headerHeight: height } = layoutContext;

  return (
    <div
      className="ac_datagrid--header--aside__panel"
      style={{ width: context.lineNumberColumnWidth, height }}
    >
      &nbsp;
    </div>
  );
};

export default React.memo(HeaderAsidePanel);
