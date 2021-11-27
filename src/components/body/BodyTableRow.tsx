/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { IColumn, IDataItem, IDatagridContext } from "../../@interface";
import predefinedFormatter from "../../lib/predefinedFormatter";
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
  const [editingPosition, setEditingPosition] = React.useState<Position>({
    col: -1,
    row: -1,
  });

  const { onClick, enableEditCell } = context;

  const containerStyle = React.useMemo(
    () => ({
      height: context.bodyRowHeight,
    }),
    [context.bodyRowHeight]
  );

  const customClickHandler = React.useCallback(
    (
      evt: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
      colIndex: number,
      value: any
    ) => {
      evt.preventDefault();

      if (colIndex === undefined) return;
      onClick?.(evt, value, rowIndex, colIndex);
      if (enableEditCell) onEditing(evt, colIndex);
    },
    [rowIndex, enableEditCell, onClick]
  );

  const editTextChnage = React.useCallback(
    (colIndex: number, edittedText: string) => {
      const nextState: IDatagridContext = {
        ...context,
      };
      const nextData: any = nextState.data;
      const key = context._colGroup?.[colIndex].key;
      if (key !== undefined) nextData[rowIndex]["value"][key] = edittedText;
      setEditingPosition((beforePosition) => {
        return { ...beforePosition, col: -1, row: -1 };
      });
    },
    [context]
  );

  const onEditing = React.useCallback(
    (evt: React.MouseEvent, colIndex: number) => {
      setEditingPosition((beforePosition) => {
        return { ...beforePosition, col: colIndex, row: rowIndex };
      });
    },
    []
  );

  const onBlur = React.useCallback(
    (evt: React.FocusEvent<HTMLInputElement, Element>, colIndex: number) => {
      const edittedText = evt.currentTarget.value;
      editTextChnage(colIndex, edittedText);
    },
    []
  );

  const onKeyUp = React.useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>, value: any) => {
      const colIndex: number = Number.parseInt(evt.currentTarget.id);
      if (
        evt.key == "Enter" &&
        colIndex == editingPosition.col &&
        rowIndex == editingPosition.row
      ) {
        editTextChnage(colIndex, evt.currentTarget.value);
      } else if (
        evt.key == "Escape" &&
        colIndex == editingPosition.col &&
        rowIndex == editingPosition.row
      ) {
        editTextChnage(colIndex, value);
      }
    },
    [editingPosition, rowIndex]
  );

  const renderItem = React.useCallback(
    (col: IColumn, ci: number) => {
      const item = Array.isArray(rowItem.value)
        ? rowItem.value[Number(col.key)]
        : rowItem.value[String(col.key)];

      let formattedItem: React.ReactNode;
      if (
        typeof col.formatter === "string" &&
        col.formatter in predefinedFormatter
      ) {
        formattedItem = predefinedFormatter[col.formatter](item);
      } else if (typeof col.formatter === "function") {
        formattedItem = col.formatter(item);
      } else {
        formattedItem = item;
      }

      return (
        <td
          className="ac-datagrid--body--main__panel__cell"
          key={ci}
          onClick={(
            evt: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
          ) => customClickHandler(evt, ci, item)}
        >
          {ci === editingPosition.col && rowIndex == editingPosition.row ? (
            <input
              className="ac-datagrid--body--main__panel__input"
              id={String(ci)}
              type="text"
              onBlur={(evt: React.FocusEvent<HTMLInputElement, Element>) =>
                onBlur(evt, ci)
              }
              autoFocus={true}
              defaultValue={item}
              onKeyUp={(evt) => onKeyUp(evt, item)}
            />
          ) : (
            <span>{formattedItem}</span>
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
