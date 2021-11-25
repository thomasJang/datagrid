import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { IColumn } from "../../@interface";
import BodyTableRow from "./BodyTableRow";
import { arrayFromRange, getDataItem } from "../../lib";
import { useDatagridFilterContext } from "../../context/DatagridFilterContext";

interface IProps {
  columns: IColumn[];
  startRowIndex: number;
  endRowIndex: number;
}
const BodyTable: React.FC<IProps> = ({
  columns,
  startRowIndex,
  endRowIndex,
}) => {
  const context = useDatagridContext();
  const filterContext = useDatagridFilterContext();

  React.useEffect(() => {
    console.log(` filter data : ${filterContext._filteredData}`);
    console.log(` isFiltered ? : ${filterContext._isFiltered}`);
  });
  return (
    <table>
      <colgroup>
        {columns.map((col, ci) => (
          <col key={ci} style={{ width: col._width }} />
        ))}
        <col />
      </colgroup>
      <tbody>
        {arrayFromRange(startRowIndex, endRowIndex).map((rowIndex) => {
          if (context.data) {
            const rowItem = getDataItem(context.data, rowIndex);
            if (rowItem) {
              return (
                { filterContext._isFiltered ? 
                <BodyTableRow
                  key={rowIndex}
                  columns={columns}
                  rowIndex={rowIndex}
                  rowItem={rowItem}
                /> : 
              <div>
               test
              </div>
              }
               
              );
            }
          }
        })}
      </tbody>
    </table>
  );
};

export default React.memo(BodyTable);
