import * as React from "react";
import ColorToggle from "./color/ColorToggle";
import ColorSelector from "./color/ColorSelector";
import CustomToggle from "./custom/CustomToggle";
import CustomSelector from "./custom/CustomSelector";
import "./style/color-custom.less";
import "./style/color-select.less";

interface IPros {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const OptionBar: React.FC<IPros> = (props) => {
  const { setTheme } = props;
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
      {selectDisplay && (
        <ColorSelector setTheme={setTheme} onMouseLeave={onMouseLeave} />
      )}
      <CustomToggle onClick={onClickCustomBox} />
      {customDisplay && <CustomSelector onClick={onClickCustomBox} />}
    </div>
  );
};

export default React.memo(OptionBar);
