import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import HeaderTable from "./HeaderTable";

interface IProps {}
const HeaderLeftPanel: React.FC<IProps> = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();

  const { _headerHeight: height = 0 } = layoutContext;

  const containerStyle = React.useMemo(
    () => ({
      height,
    }),
    [height]
  );

  const lineNumberColumnWidth = React.useMemo(() => {
    return context.enableLineNumber
      ? layoutContext._lineNumberColumnWidth || 50
      : 0;
  }, [context.enableLineNumber, layoutContext._lineNumberColumnWidth]);

  if (!context._leftColGroup || context._leftColGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac-datagrid--header--left_panel" style={containerStyle}>
      <HeaderTable
        columns={context._leftColGroup}
        lineNumberColumnWidth={lineNumberColumnWidth}
      />
    </div>
  );
};

export default React.memo(HeaderLeftPanel);
