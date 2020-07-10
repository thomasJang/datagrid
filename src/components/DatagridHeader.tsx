import React, { useContext, useRef, useEffect } from 'react';
import DatagridContext from '../context/DatagridContext';
import { IDatagridHeader } from '../lib/@interface';
import HeaderAsidePanel from './header/HeaderAsidePanel';
import HeaderLeftPanel from './header/HeaderLeftPanel';
import HeaderMainPanel from './header/HeaderMainPanel';
import useIsomorphicLayoutEffect from '../lib/useIsomorphicLayoutEffect';

const DatagridHeader: React.FC<IDatagridHeader> = props => {
  const [context, setContext] = useContext(DatagridContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState<
    number | undefined
  >(undefined);
  const styles = React.useMemo(() => {
    return { ...props.style, height: context.headerHeight };
  }, [props.style, context.headerHeight])

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    setContainerHeight(containerRef.current.clientHeight);
  }, [props.style, context.headerHeight]);

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
