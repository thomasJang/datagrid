import React, {useContext} from 'react';
import DatagridContext from '../../context/DatagridContext';

interface IProps {
    containerHeight: number;
}

const HeaderAsidePanel: React.FC<IProps> = ({containerHeight}) => {
    const [context] = useContext(DatagridContext);

    if (!context.enableLineNumber) {
        return null;
    }
    return (
        <div
            className="ac_datagrid--header--aside__panel"
            style={{width: context.lineNumberColumnWidth, height: containerHeight}}
        >
            &nbsp;
        </div>
    );
};

export default React.memo(HeaderAsidePanel);
