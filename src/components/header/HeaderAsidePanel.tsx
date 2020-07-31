import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";

interface IProps {}
const HeaderAsidePanel: React.FC<IProps> = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();

  const { _headerHeight: height } = layoutContext;

  const containerStyle = React.useMemo(
    () => ({
      width: layoutContext._lineNumberColumnWidth,
      height,
    }),
    [layoutContext._lineNumberColumnWidth, height]
  );

  if (!context.enableLineNumber) {
    return null;
  }

  return (
    <div className="ac_datagrid--header--aside__panel" style={containerStyle}>
      &nbsp;
    </div>
  );
};

export default React.memo(HeaderAsidePanel);
