import { IDatagridContext } from './@interface';

interface IGetCTXOptions {
  enableFrozenCell?: boolean;
  frozenColumnIndex?: number;
  containerWidth: number;
}

function getCTXDataByColumns(
  columns: IDatagridContext['columns'],
  options: IGetCTXOptions,
) {
  const _leftColGroup: IDatagridContext['columns'] = [];
  const _colGroup: IDatagridContext['columns'] = [];
  const columnMinWidth = 100;
  let _totalWidthOfColumns = 0;

  if (columns) {
    const { enableFrozenCell, frozenColumnIndex = 0, containerWidth } = options;
    // calculate columns width
    let computedWidth: number;
    const autoWidthColGroupIndexes: number[] = [];
    const _columns = columns.map((column, ci) => {
      const _column = { ...column };
      if (_column.width === undefined) {
        _totalWidthOfColumns += _column._width = columnMinWidth;
      } else if (typeof _column.width === 'number') {
        _totalWidthOfColumns += _column._width = Number(_column.width);
      } else if (_column.width === '*') {
        autoWidthColGroupIndexes.push(ci);
      } else if (
        ('' + _column.width).substring(('' + _column.width).length - 1) === '%'
      ) {
        _totalWidthOfColumns += _column._width =
          (containerWidth *
            Number(
              ('' + _column.width).substring(
                0,
                ('' + _column.width).length - 1,
              ),
            )) /
          100;
      }

      return _column;
    });

    if (autoWidthColGroupIndexes.length > 0) {
      computedWidth =
        (containerWidth - _totalWidthOfColumns) /
        autoWidthColGroupIndexes.length;
      for (let i = 0, l = autoWidthColGroupIndexes.length; i < l; i++) {
        _columns[autoWidthColGroupIndexes[i]]._width =
          computedWidth < columnMinWidth ? columnMinWidth : computedWidth;
      }
    }
    // 컬럼의 시작위치와 끝위치 계산

    for (let i = 0; i < _columns.length; i++) {
      if (i === 0) {
        _columns[i]._sx = 0;
      } else {
        _columns[i]._sx = _columns[i - 1]._ex;
      }
      _columns[i]._ex = (_columns[i]._sx || 0) + (_columns[i]._width || 0);
    }

    // calculate frozen colGroup
    if (enableFrozenCell && frozenColumnIndex > 0) {
      _columns.slice(0, frozenColumnIndex).forEach(column => {
        _leftColGroup.push({ ...column });
      });
    }

    _columns.slice(enableFrozenCell ? frozenColumnIndex : 0).forEach(column => {
      _colGroup.push({ ...column });
    });
  }

  return {
    _totalWidthOfColumns,
    _leftColGroup,
    _colGroup,
  };
}

export default getCTXDataByColumns;
