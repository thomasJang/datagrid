import React, { useContext } from 'react';
import DatagridContext from '../../context/DatagridContext';
import HeaderTable from './HeaderTable';

interface IProps {
  containerHeight: number;
}
const HeaderLeftPanel: React.FC<IProps> = ({ containerHeight }) => {
  const [context] = useContext(DatagridContext);

  if (!context._leftColGroup || context._leftColGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac_datagrid--header--left_panel"
         style={{height: containerHeight}}
    >
      <HeaderTable columns={context._leftColGroup} height={containerHeight} />
    </div>
  );
};

export default React.memo(HeaderLeftPanel);
