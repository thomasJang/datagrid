import * as React from "react";
import { IColumn } from "../../@interface";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch,
} from "../../context/DatagridLayoutContext";
import Resizer from "../resizer/Resizer";

interface IProps {
  columns?: IColumn[];
  lineNumberColumnWidth: number;
}
const HeaderTable: React.FC<IProps> = ({ columns, lineNumberColumnWidth }) => {
  const layoutContext = useDatagridLayoutContext();
  const { _headerHeight: height } = layoutContext;
  const [display, setDisplay] = React.useState(0);
  const [column, setColumn] = React.useState(-1);

  const onClick: React.MouseEventHandler<HTMLTableDataCellElement> = React.useCallback(
    (evt) => {
      evt.preventDefault();
      setDisplay(display + 1);
      setColumn(parseInt(evt.currentTarget.id));
    },
    [display]
  );

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
        <td
          className="ac-datagrid--header--main__panel_cell"
          id={String(ci)}
          key={ci}
          onClick={onClick}
          style={columnStyle}
        >
          {column == ci ? (
            <>
              {display % 3 == 1 ? (
                <span className="arrow_icon arrow_icon_down" />
              ) : (
                <></>
              )}
              {display % 3 == 2 ? (
                <span className="arrow_icon arrow_icon_up" />
              ) : (
                <></>
              )}
            </>
          ) : null}
          <span>{col.label}</span>
          <Resizer index={ci} col={col} />
        </td>
      );
    },
    [onClick, columnStyle, column, display]
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
