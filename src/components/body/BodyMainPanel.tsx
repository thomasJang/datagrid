import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import BodyTable from "./BodyTable";

interface IProps {
  startRowIndex: number;
  endRowIndex: number;
  styleTop: number;
  styleLeft: number;
}
const BodyMainPanel: React.FC<IProps> = ({
  startRowIndex,
  endRowIndex,
  styleTop,
  styleLeft
}) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyWidth = 1, _bodyHeight = 1 } = layoutContext;

  const lineNumberColumnWidth = React.useMemo(() => {
    return context.enableLineNumber
      ? layoutContext._lineNumberColumnWidth || 50
      : 0;
  }, [context.enableLineNumber, layoutContext._lineNumberColumnWidth]);

  const containerStyle = React.useMemo(
    () => ({
      left: lineNumberColumnWidth,
      width: _bodyWidth - lineNumberColumnWidth,
      height: _bodyHeight
    }),
    [_bodyWidth, _bodyHeight, lineNumberColumnWidth]
  );

  const contentContainerStyle = React.useMemo(
    () => ({
      top: styleTop,
      left: styleLeft
    }),
    [styleTop, styleLeft]
  );

  if (!context._colGroup || context._colGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac-datagrid--body--main__panel" style={containerStyle}>
      <div data-panel={"scroll-content"} style={contentContainerStyle}>
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
