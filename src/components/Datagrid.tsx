import React, { useState, useEffect } from 'react';
import { IDatagridProps, IDatagridContext } from '../lib/@interface';
import DataContext from '../context/DatagridContext';
import getCTXDataByColumns from '../lib/getCTXDataByColumns';

const Datagrid: React.FC<IDatagridProps> = props => {
  const [ctx, setCtx] = useState<IDatagridContext>({});
  const { cssClassName = 'ac_datagrid' } = ctx;
  const styles: React.CSSProperties = {
    ...props.style,
    width: props.width,
    height: props.height,
  };

  // componnent didUpdate
  useEffect(() => {
    // make new context
    const nextCtx: IDatagridContext = {
      ...ctx,
      ...props,
      _scrollLeft: 0,
      _scrollTop: 0,
    };

    if (
      ctx.columns !== nextCtx.columns ||
      ctx.enableFrozenCell !== nextCtx.enableFrozenCell ||
      ctx.frozenColumnIndex !== nextCtx.frozenColumnIndex
    ) {
      const {
        _leftColGroup,
        _colGroup,
        _totalWidthOfColumns,
      } = getCTXDataByColumns(nextCtx.columns, {
        containerWidth: nextCtx.width || 0,
        enableFrozenCell: nextCtx.enableFrozenCell,
        frozenColumnIndex: nextCtx.frozenColumnIndex,
      });
      nextCtx._leftColGroup = _leftColGroup;
      nextCtx._colGroup = _colGroup;
      nextCtx._totalWidthOfColumns = _totalWidthOfColumns;
      console.log(
        'getCTXData by columns',
        _leftColGroup,
        _colGroup,
        _totalWidthOfColumns,
      );
    }
    if (ctx.data !== nextCtx.data) {
      console.log('changed or init data');
    }

    setCtx(nextCtx);
  }, [props.width, props.columns, props.enableFrozenCell, props.frozenColumnIndex]);

  return (
    <DataContext.Provider value={[ctx, setCtx]}>
      <div className={cssClassName} style={styles}>
        {props.children}
      </div>
    </DataContext.Provider>
  );
};

export default Datagrid;
