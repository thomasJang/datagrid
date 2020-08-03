import * as React from "react";
import {
  IDatagridVerticalScroller,
  LayoutContextActionTypes
} from "../@interface";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";
import { useDatagridContext } from "../context/DatagridContext";
import debounce from "lodash.debounce";

const DatagridVerticalScroller: React.FC<IDatagridVerticalScroller> = ({
  style,
  size = 12
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const { _bodyHeight: scrollContainerHeight, _scrollTop } = layoutContext;

  const [barY, setBarY] = React.useState(0);
  const [barHeight, setBarHeight] = React.useState(0);
  const [display, setDisplay] = React.useState(false);
  const [scrollActive, setScrollActive] = React.useState(false);

  const bodyContentHeight = React.useMemo(() => {
    return context.dataLength * (context.bodyRowHeight || 1);
  }, [context.dataLength, context.bodyRowHeight]);

  const styles: React.CSSProperties = {
    ...style,
    width: size,
    height: scrollContainerHeight
  };

  const handleActiveScrollBar: React.MouseEventHandler<HTMLDivElement> = ev => {
    ev.preventDefault();

    const _scrollTop = layoutContext._scrollTop;
    const startClientY = ev.clientY;

    const mouseMove = debounce((evt: MouseEvent) => {
      if (!scrollContainerHeight) return;
      let newBarY = _scrollTop + evt.clientY - startClientY;

      // check limit
      if (newBarY < 0) {
        newBarY = 0;
      } else if (newBarY + barHeight > scrollContainerHeight) {
        newBarY = scrollContainerHeight - barHeight;
      }

      // convertScrollY
      const barScrollableHeight = scrollContainerHeight - barHeight;
      const contentScrollableHeight =
        bodyContentHeight - (layoutContext._bodyHeight || 0);
      const scrollTop =
        (contentScrollableHeight * newBarY) / barScrollableHeight;

      layoutDispatch({
        type: LayoutContextActionTypes.SET_SCROLL_TOP,
        scrollTop
      });
    });

    const mouseMoveEnd = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseMoveEnd);
      document.removeEventListener("mouseleave", mouseMoveEnd);

      setScrollActive(false);
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseMoveEnd);
    document.addEventListener("mouseleave", mouseMoveEnd);

    setScrollActive(true);
  };

  React.useEffect(() => {
    if (!containerRef.current) return;

    const _containerHeight = containerRef.current.clientHeight;
    if (bodyContentHeight) {
      let _barHeight =
        (_containerHeight * _containerHeight) / bodyContentHeight;
      if (_barHeight < 10) {
        _barHeight = 10;
      }
      setDisplay(_barHeight < _containerHeight);
      setBarHeight(_barHeight);
    }
  }, [scrollContainerHeight, bodyContentHeight]);

  React.useEffect(() => {
    if (!containerRef.current) return;
    if (!scrollContainerHeight) return;

    const _containerHeight = containerRef.current.clientHeight;
    const barScrollableHeight = _containerHeight - barHeight;
    const contentScrollableHeight =
      bodyContentHeight - (layoutContext._bodyHeight || 0);

    let newBarY = Math.max(
      0,
      (barScrollableHeight * _scrollTop) / (contentScrollableHeight || 1)
    );
    // check limit
    if (newBarY + barHeight > scrollContainerHeight) {
      newBarY = scrollContainerHeight - barHeight;
    }

    setBarY(newBarY);
  }, [_scrollTop, barHeight]);

  const scrollBarStyle = React.useMemo(
    () => ({
      height: barHeight,
      top: barY
    }),
    [barHeight, barY]
  );

  const scrollBarClassName = React.useMemo(
    () => (layoutContext._hover || scrollActive ? "active" : ""),
    [layoutContext._hover, scrollActive]
  );

  return (
    <div
      ref={containerRef}
      data-scroller={"vertical"}
      className={"ac-datagrid--scroller"}
      style={styles}
    >
      {display && (
        <div
          data-scroll-bar={"vertical"}
          className={scrollBarClassName}
          style={scrollBarStyle}
          onMouseDown={handleActiveScrollBar}
        />
      )}
    </div>
  );
};

export default React.memo(DatagridVerticalScroller);
