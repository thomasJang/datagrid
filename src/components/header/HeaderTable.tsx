import React, { useContext } from 'react';
import DatagridContext from '../../context/DatagridContext';
import { IColumn } from '../../common/@interface';

interface IProps {
  height: number;
  columns: IColumn[];
}
const HeaderTable: React.FC<IProps> = ({ height, columns }) => {
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
              {col.label}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default HeaderTable;
