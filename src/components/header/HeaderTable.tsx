import React from "react";
import { IColumn } from "../../@interface";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import { useDatagridContext } from "../../context/DatagridContext";

interface IProps {
  columns: IColumn[];
}
const HeaderTable: React.FC<IProps> = ({ columns }) => {
  const layoutContext = useDatagridLayoutContext();
  const context = useDatagridContext();
  const { _headerHeight: height } = layoutContext;
  return (
    <table>
      <colgroup>
        {columns.map((col, ci) => (
          <col key={ci} style={{ width: col._width }} />
        ))}
        <col />
      </colgroup>
      <tbody>
        <tr>
          {columns.map((col, ci) => (
            <td key={ci} style={{ height }}>
              <span>{col.label}</span>
            </td>
          ))}
          <td />
        </tr>
      </tbody>
    </table>
  );
};

export default React.memo(HeaderTable);
