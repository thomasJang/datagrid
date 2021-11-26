import * as React from "react";
import {
  IDatagridHorizontalScroller,
  LayoutContextActionTypes,
} from "../@interface";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch,
} from "../context/DatagridLayoutContext";
import debounce from "lodash.debounce";

const DatagridHorizontalScroller: React.FC<IDatagridHorizontalScroller> = ({
  style,
  // width,
  size = 12,
}) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();

  const [barX, setBarX] = React.useState(0);
  const [barWidth, setBarWidth] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [enable, setEnable] = React.useState(false);
  const [scrollActive, setScrollActive] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { enableLineNumber, /*_totalWidthOfColumns*/ _colGroup = [] } = context;
  const {
    _hover,
    _bodyWidth = 1,
    _lineNumberColumnWidth = 50,
    _scrollLeft,
  } = layoutContext;

  const contentScrollContainerWidth = React.useMemo(() => {
    return (_bodyWidth || 1) - (enableLineNumber ? _lineNumberColumnWidth : 0);
  }, [_bodyWidth, _lineNumberColumnWidth, enableLineNumber]);

  const bodyContentWidth = React.useMemo(() => {
    return _colGroup
      .map((n) => n._width || 0)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
  }, [_colGroup]);

  const styles: React.CSSProperties = React.useMemo(
    () => ({
      ...style,
      width: "100%",
      height: size,
    }),
    [style, size]
  );

  const handleActiveScrollBar: React.MouseEventHandler<HTMLDivElement> = (
    ev
  ) => {
    ev.preventDefault();

    const startClientX = ev.clientX;

    const mouseMove = debounce((evt: MouseEvent) => {
      let newBarX = _scrollLeft + evt.clientX - startClientX;

      // check limit
      if (newBarX < 0) {
        newBarX = 0;
      } else if (newBarX + barWidth > containerWidth) {
        newBarX = containerWidth - barWidth;
      }

      // convertScrollY
      const barScrollableWidth = containerWidth - barWidth;
      const contentScrollableWidth =
        bodyContentWidth - contentScrollContainerWidth;

      const scrollLeft =
        (contentScrollableWidth * newBarX) / barScrollableWidth;

      layoutDispatch({
        type: LayoutContextActionTypes.SET_SCROLL_LEFT,
        scrollLeft: scrollLeft,
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

    const _containerWidth = containerRef.current.clientWidth;

    let _barWidth =
      (contentScrollContainerWidth * _containerWidth) / bodyContentWidth;

    if (_barWidth < 10) {
      _barWidth = 10;
    }
    setContainerWidth(_containerWidth);
    setEnable(_barWidth < _containerWidth);
    setBarWidth(_barWidth);
  }, [containerWidth, bodyContentWidth, contentScrollContainerWidth]);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const _containerWidth = containerRef.current.clientWidth;
    const barScrollableWidth = _containerWidth - barWidth;
    const contentScrollableWidth =
      bodyContentWidth - contentScrollContainerWidth;

    setBarX((barScrollableWidth * _scrollLeft) / (contentScrollableWidth || 1));
  }, [_scrollLeft, barWidth, bodyContentWidth, contentScrollContainerWidth]);

  const scrollBarStyle = React.useMemo(
    () => ({
      width: barWidth,
      left: barX,
    }),
    [barWidth, barX]
  );

  return (
    <div
      ref={containerRef}
      data-scroller={"horizontal"}
      className={"ac-datagrid--scroller"}
      style={styles}
    >
      {enable && (
        <div
          data-scroll-bar={"horizontal"}
          className={_hover || scrollActive ? "active" : ""}
          style={scrollBarStyle}
          onMouseDown={handleActiveScrollBar}
        />
      )}
    </div>
  );
};

export default React.memo(DatagridHorizontalScroller);
