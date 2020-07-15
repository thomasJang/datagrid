import React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { IColumn, IDataItem } from "../../@interface";

interface IProps {
  columns: IColumn[];
  rowIndex: number;
  rowItem: IDataItem;
}

const BodyTableRow: React.FC<IProps> = ({ columns, rowIndex, rowItem }) => {
  const context = useDatagridContext();
  return (
    <tr style={{ height: context.bodyRowHeight }}>
      {columns.map((col, ci) => (
        <td key={ci}>
          <span>
            {Array.isArray(rowItem.value)
              ? rowItem.value[Number(col.key)]
              : rowItem.value[col.key + ""]}
          </span>
        </td>
      ))}
      <td />
    </tr>
  );
};

export default React.memo(BodyTableRow);
