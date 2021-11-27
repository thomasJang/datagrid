import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import { arrayFromRange } from "../../lib";

interface IProps {
  startRowIndex: number;
  endRowIndex: number;
}
const BodyAsidePanel: React.FC<IProps> = ({ startRowIndex, endRowIndex }) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;

  const lineNumberStartAt = React.useMemo(
    () => context.lineNumberStartAt || 1,
    [context.lineNumberStartAt]
  );

  const tableStyle = React.useMemo(
    () => ({ width: layoutContext._lineNumberColumnWidth, height }),
    [layoutContext._lineNumberColumnWidth, height]
  );

  const rowStyle = React.useMemo(() => ({ height: context.bodyRowHeight }), [
    context.bodyRowHeight,
  ]);

  if (!context.enableLineNumber) {
    return null;
  }

  return (
    <table
      style={tableStyle}
      className="ac-datagrid--body--main__panel--body__aside__table"
    >
      <tbody>
        {arrayFromRange(startRowIndex, endRowIndex).map((rowIndex) => {
          return (
            <tr key={rowIndex} style={rowStyle}>
              <td>
                <span>{lineNumberStartAt + rowIndex}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(BodyAsidePanel);
