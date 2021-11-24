import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { IColumn, IDataItem } from "../../@interface";

interface IProps {
  columns: IColumn[];
  rowIndex: number;
  rowItem: IDataItem;
}

type onPos = {
  col : Number
  row : Number
}

const BodyTableRow: React.FC<IProps> = ({ columns, rowIndex, rowItem }) => {
  const context = useDatagridContext();
<<<<<<< HEAD
  const [onEdit, setOnEdit] = React.useState(false);
  const [idx, setIdx] = React.useState(rowIndex);
=======
  const [onEdit, setOnEdit] = React.useState<onPos>({col: -1, row: -1});

>>>>>>> 8a28d75bc143cf2e65b2a0de8864df2f97404931
  const containerStyle = React.useMemo(
    () => ({
      height: context.bodyRowHeight,
    }),
    [context.bodyRowHeight]
  );

  const {onClick} = context;

<<<<<<< HEAD
  const customClickHandler=(e: React.MouseEvent) => {
    const value = e.currentTarget.getAttribute('data-item')
    const colIdx = e.currentTarget.getAttribute('data-col')
    setOnEdit(!onEdit);
    console.log(`value : ${value}`);
    console.log(`Idx : ${colIdx}`);
    onClick?.()
  }
=======
  const customClickHandler: React.MouseEventHandler<HTMLTableDataCellElement> = (evt) => {
    evt.preventDefault();
    const value = evt.currentTarget.dataset.value;
    const colIdx = evt.currentTarget.dataset.col
    const rowIdx = rowIndex;
    onClick?.();
    if(colIdx)
      onEditing(evt, Number.parseInt(colIdx), rowIdx);
  }

  const onEditing = (evt : React.MouseEvent, colIdx: number, rowIdx: number) => {
    setOnEdit({...onEdit, col:colIdx, row:rowIdx});
  };
>>>>>>> 8a28d75bc143cf2e65b2a0de8864df2f97404931

  const onBlur:React.FocusEventHandler<HTMLInputElement> = (evt) => {
    setOnEdit({...onEdit, col: -1, row: -1});
  }

  const renderItem = React.useCallback(
    (col: IColumn, ci: number) => {
      const item = Array.isArray(rowItem.value)
        ? rowItem.value[Number(col.key)]
        : rowItem.value[String(col.key)];
      return (
<<<<<<< HEAD
        // 
        <td key={ci}  onClick={customClickHandler} data-item={item} data-col ={ci}>
          { onEdit ?  <input type="text" /> : <span>{item} ...</span>}
=======
        <td key={ci}  onClick={customClickHandler} data-col ={ci} data-value ={item}>
          { ci === onEdit.col && rowIndex == onEdit.row ?  <input type="text" onBlur = {onBlur} autoFocus={true}/> : <span>{item}</span>}
>>>>>>> 8a28d75bc143cf2e65b2a0de8864df2f97404931
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
