import React, { useContext } from 'react';
import DatagridContext from '../../context/DatagridContext';
import HeaderTable from './HeaderTable';

interface IProps {
  containerHeight: number;
}
const HeaderLeftPanel: React.FC<IProps> = ({ containerHeight }) => {
  const [context] = useContext(DatagridContext);
  const { _leftColGroup } = context;

  if (!_leftColGroup || _leftColGroup.length < 1) {
    return null;
  }

  return (
    <div className="ac_datagrid--header--left_panel">
      <HeaderTable columns={_leftColGroup} height={containerHeight} />
    </div>
  );
};

export default HeaderLeftPanel;
