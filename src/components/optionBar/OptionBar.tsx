import * as React from "react";
import { IDatagridOptionBar } from "@interface";
import ColorToggle from "./color/ColorToggle";
import CustomToggle from "./custom/CustomToggle";
import ColorSelector from "./color/ColorSelector";
import ColorCustom from "./custom/ColorCustom";

const OptionBar: React.FC<IDatagridOptionBar> = () => {
  const [selectDisplay, setSelectDisplay] = React.useState(false);
  const [customDisplay, setCustomDisplay] = React.useState(false);

  const onClick = React.useCallback(() => {
    setSelectDisplay((prev) => !prev);
    if (customDisplay) setCustomDisplay((prev) => !prev);
  }, [customDisplay]);

  const onClickCustomBox = React.useCallback(() => {
    if (selectDisplay) setSelectDisplay((prev) => !prev);
    setCustomDisplay((prev) => !prev);
  }, [selectDisplay]);

  const onMouseLeave = React.useCallback(() => {
    setSelectDisplay((prev) => !prev);
  }, []);

  return (
    <div className="ac-datagrid--option_bar">
      <ColorToggle onClick={onClick} />
      {selectDisplay && <ColorSelector onMouseLeave={onMouseLeave} />}
      <CustomToggle onClick={onClickCustomBox} />
      {customDisplay && <ColorCustom />}
    </div>
  );
};

export default React.memo(OptionBar);
