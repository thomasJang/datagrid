import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import { arrayFromRange } from "../../lib";

interface IProps {
  startRowIndex: number;
  endRowIndex: number;
  styleTop: number;
}
const BodyAsidePanel: React.FC<IProps> = ({
  startRowIndex,
  endRowIndex,
  styleTop,
}) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;

  const lineNumberStartAt = React.useMemo(
    () => context.lineNumberStartAt || 1,
    [context.lineNumberStartAt]
  );

  const containerStyle = React.useMemo(
    () => ({ width: layoutContext._lineNumberColumnWidth, height }),
    [layoutContext._lineNumberColumnWidth, height]
  );

  const contentContainerStyle = React.useMemo(() => ({ top: styleTop }), [
    styleTop,
  ]);

  const rowStyle = React.useMemo(() => ({ height: context.bodyRowHeight }), [
    context.bodyRowHeight,
  ]);

  if (!context.enableLineNumber) {
    return null;
  }

  return (
    <div className="ac-datagrid--body--aside__panel" style={containerStyle}>
      <div data-panel={"scroll-content"} style={contentContainerStyle}>
        <table>
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
      </div>
    </div>
  );
};

export default React.memo(BodyAsidePanel);
