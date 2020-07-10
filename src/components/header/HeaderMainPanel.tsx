import React, {useContext} from 'react';
import DatagridContext from '../../context/DatagridContext';
import HeaderTable from './HeaderTable';

interface IProps {
    containerHeight: number;
}

const HeaderMainPanel: React.FC<IProps> = ({containerHeight}) => {
    const [context] = useContext(DatagridContext);

    if (!context._colGroup || context._colGroup.length < 1) {
        return null;
    }
    return (
        <div className="ac_datagrid--header--main__panel" style={{ height: containerHeight }}>
            <HeaderTable columns={context._colGroup} height={containerHeight}/>
        </div>
    );
};

export default React.memo(HeaderMainPanel);
