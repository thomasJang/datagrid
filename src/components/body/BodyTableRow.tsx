import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { IColumn, IDataItem } from "../../@interface";

interface IProps {
  columns: IColumn[];
  rowIndex: number;
  rowItem: IDataItem;
}

const BodyTableRow: React.FC<IProps> = ({ columns, rowIndex, rowItem }) => {
  const context = useDatagridContext();

  const containerStyle = React.useMemo(
    () => ({
      height: context.bodyRowHeight,
    }),
    [context.bodyRowHeight]
  );

  const renderItem = React.useCallback(
    (col: IColumn, ci: number) => {
      const item = Array.isArray(rowItem.value)
        ? rowItem.value[Number(col.key)]
        : rowItem.value[String(col.key)];

      return (
        <td key={ci}>
          <span>{item}</span>
        </td>
      );
    },
    [rowItem.value]
  );

  return (
    <tr style={containerStyle}>
      {columns.map(renderItem)}
      <td />
    </tr>
  );
};

export default React.memo(BodyTableRow);
