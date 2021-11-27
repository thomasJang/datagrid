import * as React from "react";
import { IColumn } from "../../@interface";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";

interface IProps {
  columns?: IColumn[];
  lineNumberColumnWidth: number;
}
const HeaderTable: React.FC<IProps> = ({ columns, lineNumberColumnWidth }) => {
  const layoutContext = useDatagridLayoutContext();
  const { _headerHeight: height } = layoutContext;

  const tableStyle = React.useMemo(() => ({ left: lineNumberColumnWidth }), [
    lineNumberColumnWidth,
  ]);

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
        </td>
      );
    },
    [columnStyle]
  );

  return (
    <table
      className="ac-datagrid--header--main__panel--header__table"
      style={tableStyle}
    >
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
