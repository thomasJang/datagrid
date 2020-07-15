import React, { useEffect, useRef } from "react";
import { IDatagridVerticalScroller } from "@interface";
import { useDatagridLayoutContext } from "../context/DatagridLayoutContext";
import { useDatagridContext } from "../context/DatagridContext";

const DatagridVerticalScroller: React.FC<IDatagridVerticalScroller> = ({
  style,
  size = 14
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layoutContext = useDatagridLayoutContext();
  const context = useDatagridContext();
  const { _bodyHeight, _scrollTop } = layoutContext;
  const bodyContentHeight = context.dataLength * (context.bodyRowHeight || 1);
  const [containerHeight, setContainerHeight] = React.useState<
    number | undefined
  >(undefined);
  const [barY, setBarY] = React.useState(0);
  const [barHeight, setBarHeight] = React.useState(0);
  const styles: React.CSSProperties = {
    ...style,
    width: size,
    height: _bodyHeight
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [layoutContext._bodyHeight]);

  useEffect(() => {
    if (_bodyHeight) {
      const _barHeight = (_bodyHeight * _bodyHeight) / bodyContentHeight;
      setBarHeight(_barHeight > 10 ? _barHeight : 10);
    }
  }, [containerHeight]);

  return (
    <div
      ref={containerRef}
      className={"ac_datagrid--scroller"}
      data-scroller={"vertical"}
      style={styles}
    >
      <div data-scroll-bar={"vertical"} style={{ height: barHeight }} />
    </div>
  );
};

export default React.memo(DatagridVerticalScroller);
