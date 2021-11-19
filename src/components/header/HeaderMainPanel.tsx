import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import HeaderTable from "./HeaderTable";

interface IProps {
  styleLeft: number;
}
const HeaderMainPanel: React.FC<IProps> = ({ styleLeft }) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();

  const lineNumberColumnWidth = React.useMemo(() => {
    return context.enableLineNumber
      ? layoutContext._lineNumberColumnWidth || 50
      : 0;
  }, [context.enableLineNumber, layoutContext._lineNumberColumnWidth]);

  const containerStyle = React.useMemo(
    () => ({
      left: lineNumberColumnWidth,
      height: layoutContext._headerHeight,
    }),
    [lineNumberColumnWidth, layoutContext._headerHeight]
  );

  const contentContainerStyle = React.useMemo(
    () => ({
      left: styleLeft,
    }),
    [styleLeft]
  );

  return (
    <div className="ac-datagrid--header--main__panel" style={containerStyle}>
      <div data-panel={"scroll-content"} style={contentContainerStyle}>
        <HeaderTable columns={context._colGroup} />
      </div>
    </div>
  );
};

export default React.memo(HeaderMainPanel);
