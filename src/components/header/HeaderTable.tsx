import React from "react";
import { IColumn } from "../../@interface";
import { useDatagridLayoutContext } from "../../context/LayoutContext";

interface IProps {
  columns: IColumn[];
}
const HeaderTable: React.FC<IProps> = ({ columns }) => {
  const layoutContext = useDatagridLayoutContext();
  const { _headerHeight: height } = layoutContext;
  return (
    <table>
      <colgroup>
        {columns.map((col, ci) => (
          <col key={ci} style={{ width: col._width }} />
        ))}
      </colgroup>
      <tbody>
        <tr>
          {columns.map((col, ci) => (
            <td key={ci} style={{ height }}>
              <span>{col.label}</span>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default React.memo(HeaderTable);
