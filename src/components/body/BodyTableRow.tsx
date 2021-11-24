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
  const [onEdit, setOnEdit] = React.useState(false);

  const containerStyle = React.useMemo(
    () => ({
      height: context.bodyRowHeight,
    }),
    [context.bodyRowHeight]
  );

  const {onClick} = context;

  const customClickHandler=(e: React.MouseEvent) => {
    const value = e.currentTarget.getAttribute('data-item')
    const colIdx = e.currentTarget.getAttribute('data-col')

  }
  const onEditing = (e : any) => {
    setOnEdit(!onEdit)
    console.log(e);
    e.stopPropagation(); 
  };

  const renderItem = React.useCallback(
    (col: IColumn, ci: number) => {
      const item = Array.isArray(rowItem.value)
        ? rowItem.value[Number(col.key)]
        : rowItem.value[String(col.key)];
      return (

        <td key={ci}  onClick={customClickHandler} data-item={item} data-col ={ci}>
          { onEdit ?  <input type="text" /> : <span>{item} ...</span>}
        </td>
      );
    },
    [rowItem.value, onEdit]
  );


  return (
    <tr style={containerStyle}>
      {columns.map(renderItem)}
      <td />
    </tr>
  );
};

export default React.memo(BodyTableRow);
