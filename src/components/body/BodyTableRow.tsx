/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useDatagridContext, useDatagridDispatch } from "../../context/DatagridContext";
import { IColumn, IDatagridContext, IDataItem } from "../../@interface";

interface IProps {
  columns: IColumn[];
  rowIndex: number;
  rowItem: IDataItem;
}

type onPos = {
  col: number;
  row: number;
};

const BodyTableRow: React.FC<IProps> = ({ columns, rowIndex, rowItem }) => {
  const context = useDatagridContext();
  const dispatch = useDatagridDispatch();
  const [onEdit, setOnEdit] = React.useState<onPos>({col: -1, row: -1});
  const [editingText, setEditingText] = React.useState("");

  const containerStyle = React.useMemo(
    () => ({
      height: context.bodyRowHeight,
    }),
    [context.bodyRowHeight]
  );

  const { onClick } = context;

  const customClickHandler: React.MouseEventHandler<HTMLTableDataCellElement> = (
    evt
  ) => {
    evt.preventDefault();

    console.log(context.data)
    const value = evt.currentTarget.dataset.value;
    const colIdx = evt.currentTarget.dataset.col
    const rowIdx = rowIndex;
    console.log(context.data);
    if(colIdx === undefined)
      return;
    onClick?.(evt, value, rowIdx,  Number.parseInt(colIdx));
    onEditing(evt, Number.parseInt(colIdx), rowIdx);
  }

  const onEditing = (evt: React.MouseEvent, colIdx: number, rowIdx: number) => {
    setOnEdit({ ...onEdit, col: colIdx, row: rowIdx });
  };

  const onBlur:React.FocusEventHandler<HTMLInputElement> = (evt) => {
    const colIdx: number = Number.parseInt(evt.currentTarget.id);
    const nextState: IDatagridContext = {
        ...context
    };
    const nextData:any = nextState.data;
    const key= context._colGroup?.[colIdx].key;
    if(key !== undefined) {
      // columns와 데이터 불일치로 인해 문제 발생
      nextData[rowIndex]["value"][key] = evt.currentTarget.value;
      console.log(nextData[rowIndex]["value"][key]);
    }
    // 디스패처 사용 안했는데 데이터 변경이 발생
    setOnEdit({...onEdit, col: -1, row: -1});
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
          {ci === onEdit.col && rowIndex == onEdit.row ? (
            <input
              id = {ci.toString()}
              type="text"
              onBlur={onBlur}
              autoFocus={true}
              placeholder={item}
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
      onEdit.col,
      onEdit.row,
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
