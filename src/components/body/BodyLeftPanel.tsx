import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";

interface IProps {}
const BodyLeftPanel: React.FC<IProps> = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;

  const containerStyle = React.useMemo(
    () => ({
      height,
    }),
    [height]
  );

  if (!context._leftColGroup || context._leftColGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac-datagrid--header--left_panel" style={containerStyle} />
  );
};

export default React.memo(BodyLeftPanel);
