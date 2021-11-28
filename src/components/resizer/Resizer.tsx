import * as React from "react";
import { useDatagridDispatch } from "../../context/DatagridContext";
import { ContextActionTypes, IColumn } from "../../@interface";
import { throttle } from "lodash";

interface IProps {
  index: number;
  col: IColumn;
}

const Resizer: React.FC<IProps> = ({ index, col }) => {
  const [resizerActive, setResizerActive] = React.useState(false);
  const [offsetX, setOffsetX] = React.useState(col._width as number);
  const dispatch = useDatagridDispatch();
  let newResizerPosition = offsetX;

  const handleActiveResizer: React.MouseEventHandler<HTMLDivElement> = (
    evt
  ) => {
    evt.preventDefault();

    const startClientX = evt.clientX;
    const mouseMove = throttle((evt: MouseEvent) => {
      let newResizerX = offsetX + (evt.clientX - startClientX);
      // check limit
      if (newResizerX < 0) {
        newResizerX = offsetX;
      } else if (newResizerX < 49.9) {
        newResizerX = 50;
      }
      newResizerPosition = newResizerX;
      setOffsetX(newResizerX);
    }, 30);
    const mouseMoveEnd = () => {
      setResizerActive(false);
      dispatch({
        type: ContextActionTypes.SET_COLUMN_WIDTH,
        _width: newResizerPosition,
        index,
      });
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseMoveEnd);
      document.removeEventListener("mouseleave", mouseMoveEnd);
    };

    setResizerActive(true);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseMoveEnd);
    document.addEventListener("mouseleave", mouseMoveEnd);
  };
  const resizerStyle = React.useMemo(
    () => ({
      transform: `translate(${offsetX}px, 0)`,
    }),
    [offsetX]
  );
  const resizerClassName = React.useMemo(
    () => (resizerActive ? "resizer resizer-active" : "resizer"),
    [resizerActive]
  );
  return (
    <div
      className={resizerClassName}
      onMouseDown={handleActiveResizer}
      style={resizerStyle}
    ></div>
  );
};

export default React.memo(Resizer);
