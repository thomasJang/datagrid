/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useDatagridContext, useDatagridDispatch } from "../../context/DatagridContext";
import { IColumn, IDatagridContext, IDataItem } from "../../@interface";

interface IProps {
  columns: IColumn[];
  rowIndex: number;
  rowItem: IDataItem;
}

type Position = {
  col: number;
  row: number;
};

const BodyTableRow: React.FC<IProps> = ({ columns, rowIndex, rowItem }) => {
  const context = useDatagridContext();
  const [editingPosition, setEditingPosition] = React.useState<Position>({col: -1, row: -1});

  const containerStyle = React.useMemo(
    () => ({
      height: context.bodyRowHeight,
    }),
    [context.bodyRowHeight]
  );

  const { onClick, setEditOptions } = context;

  const customClickHandler: React.MouseEventHandler<HTMLTableDataCellElement> = (
    evt
  ) => {
    evt.preventDefault();

    const value = evt.currentTarget.dataset.value;
    const colIdx = evt.currentTarget.dataset.col
    const rowIdx = rowIndex;
    if(colIdx === undefined)
      return;
    onClick?.(evt, value, rowIdx,  Number.parseInt(colIdx));
    if(setEditOptions)
      onEditing(evt, Number.parseInt(colIdx), rowIdx);
  }

  const onEditing = (evt: React.MouseEvent, colIdx: number, rowIdx: number) => {
    setEditingPosition({ ...editingPosition, col: colIdx, row: rowIdx });
  };

  const onBlur:React.FocusEventHandler<HTMLInputElement> = (evt) => {
    const colIdx: number = Number.parseInt(evt.currentTarget.id);
    const edittedText = evt.currentTarget.value;
    editTextChnage(colIdx, edittedText);
  }

  const editTextChnage = (colIdx: number, edittedText: string) => {
    const nextState: IDatagridContext = {
        ...context
    };
    const nextData:any = nextState.data;
    const key= context._colGroup?.[colIdx].key;
    if (key !== undefined)
      nextData[rowIndex]["value"][key] = edittedText;
      setEditingPosition({...setEditingPosition, col: -1, row: -1});
  }

  const onKeyUp = (evt:React.KeyboardEvent<HTMLInputElement>, ci: number, rowIndex: number, value: any) => {
    if (evt.key == 'Enter' && ci == editingPosition.col && rowIndex == editingPosition.row) {
      editTextChnage(ci, evt.currentTarget.value);
    }
    else if(evt.key == 'Escape' && ci == editingPosition.col && rowIndex == editingPosition.row) {
      editTextChnage(ci, value);
    }
  }

  const renderItem = React.useCallback(
    (col: IColumn, ci: number) => {
      const item = Array.isArray(rowItem.value)
        ? rowItem.value[Number(col.key)]
        : rowItem.value[String(col.key)];
      return (
        <td
          key={ci}
          onClick={customClickHandler}
          data-col={ci}
          data-value={item}
          
        >
          {ci === editingPosition.col && rowIndex == editingPosition.row ? (
            <input
              id = {ci.toString()}
              type="text"
              onBlur={onBlur}
              autoFocus={true}
              defaultValue ={item}
              onKeyUp = {(evt) => onKeyUp(evt, ci, rowIndex,item)}
            />
          ) : (
            <span>{item}</span>
          )}
        </td>
      );
    },
    [
      rowItem.value,
      customClickHandler,
      editingPosition.col,
      editingPosition.row,
      rowIndex,
      onBlur,
    ]
  );

  return (
    <tr style={containerStyle}>
      {columns.map(renderItem)}
      <td />
    </tr>
  );
};

export default React.memo(BodyTableRow);
