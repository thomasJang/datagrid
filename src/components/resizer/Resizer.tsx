import * as React from "react";
import debounce from "lodash.debounce";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch,
} from "../../context/DatagridLayoutContext";
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from "constants";
interface IProps {}

const Resizer: React.FC<IProps> = () => {
  const [resizerActive, setResizerActive] = React.useState(true);
  const [offsetX, setOffsetX] = React.useState(100);
  const handleActiveResizer: React.MouseEventHandler<HTMLDivElement> = (
    evt
  ) => {
    evt.preventDefault();

    const startClientX = evt.clientX;

    const mouseMove = debounce((evt: MouseEvent) => {
      //if (!_bodyHeight) return;
      //console.dir(evt);
      let newResizerX = offsetX + (evt.clientX - startClientX);
      setOffsetX(newResizerX);
      console.log(newResizerX, startClientX);
      // check limit
      /*if (newResizerX < 0) {
        newResizerX = 0;
      } else if (newResizerX + barHeight > _bodyHeight) {
        newBarY = _bodyHeight - barHeight;
      }

      // convertScrollY

      layoutDispatch({
        type: LayoutContextActionTypes.SET_SCROLL_TOP,
        scrollTop,
      });
      */
    });
    const mouseMoveEnd = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseMoveEnd);
      document.removeEventListener("mouseleave", mouseMoveEnd);
      //setResizerActive(false);
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseMoveEnd);
    document.addEventListener("mouseleave", mouseMoveEnd);

    //setResizerActive(true);
  };
  const resizerStyle = React.useMemo(
    () => ({
      transform: `translate(${offsetX}px, 0)`,
    }),
    [offsetX]
  );
  return (
    <div
      className="resizer"
      onMouseDown={handleActiveResizer}
      style={resizerStyle}
    ></div>
  );
};

export default React.memo(Resizer);
