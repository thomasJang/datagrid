import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import { arrayFromRange, getDataItem } from "../../lib";
import BodyTableRow from "./BodyTableRow";

interface IProps {
  startRowIndex: number;
  endRowIndex: number;
  styleTop: number;
}
const BodyAsidePanel: React.FC<IProps> = ({
  startRowIndex,
  endRowIndex,
  styleTop
}) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyHeight: height } = layoutContext;

  if (!context.enableLineNumber) {
    return null;
  }

  const lineNumberStartAt = React.useMemo(
    () => context.lineNumberStartAt || 1,
    [context.lineNumberStartAt]
  );

  return (
    <div
      className="ac_datagrid--body--aside__panel"
      style={{ width: layoutContext._lineNumberColumnWidth, height }}
    >
      <div data-panel={"scroll-content"} style={{ top: styleTop }}>
        <table>
          <tbody>
            {arrayFromRange(startRowIndex, endRowIndex).map(rowIndex => {
              return (
                <tr key={rowIndex} style={{ height: context.bodyRowHeight }}>
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
