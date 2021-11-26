import * as React from "react";
import { IColumn } from "../../@interface";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import Resizer from "../resizer/Resizer";

interface IProps {
  columns?: IColumn[];
}
const HeaderTable: React.FC<IProps> = ({ columns }) => {
  const layoutContext = useDatagridLayoutContext();
  const { _headerHeight: height } = layoutContext;

  const columnStyle = React.useMemo(
    () => ({
      height,
    }),
    [height]
  );

  const renderColumn = React.useCallback((col: IColumn, ci: number) => {
    return <col key={ci} style={{ width: col._width }} />;
  }, []);

  const renderTd = React.useCallback(
    (col: IColumn, ci: number) => {
      return (
        <td key={ci} style={columnStyle}>
          <span>{col.label}</span>
          <Resizer />
        </td>
      );
    },
    [columnStyle]
  );

  return (
    <table>
      <colgroup>
        {(columns || []).map(renderColumn)}
        <col />
      </colgroup>
      <tbody>
        <tr>
          {(columns || []).map(renderTd)}
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default React.memo(HeaderTable);
