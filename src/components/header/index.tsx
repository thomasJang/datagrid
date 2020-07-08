import React, { useContext, useRef, useEffect } from 'react';
import DatagridContext from '../../context/DatagridContext';
import { IDatagridHeader } from '../../common/@interface';
import HeaderAsidePanel from './HeaderAsidePanel';
import HeaderLeftPanel from './HeaderLeftPanel';
import HeaderMainPanel from './HeaderMainPanel';
import useIsomorphicLayoutEffect from '../../common/useIsomorphicLayoutEffect';

const DatagridHeader: React.FC<IDatagridHeader> = props => {
  const [context, setContext] = useContext(DatagridContext);
  const { headerHeight = 30 } = context;
  const styles = { ...props.style, height: headerHeight };
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState<
    number | undefined
  >(undefined);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    setContainerHeight(containerRef.current.clientHeight);
  }, []);

  return (
    <div ref={containerRef} style={styles} className="ac_datagrid--header">
      {containerHeight !== undefined && (
        <>
          <HeaderAsidePanel containerHeight={containerHeight} />
          <HeaderLeftPanel containerHeight={containerHeight} />
          <HeaderMainPanel containerHeight={containerHeight} />
        </>
      )}
    </div>
  );
};

export default DatagridHeader;
