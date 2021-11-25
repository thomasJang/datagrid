import * as React from "react";
import { IDatagridOptionBar } from "@interface";
import FilterToggle from "./FilterToggle";
import FilterSelector from "./FilterSelector";
import ColorToggle from "./ColorToggle";
import ColorSelector from "./ColorSelector";
import { ThemeContextActionTypes } from "../../@interface";
import { useDatagridThemeContext } from "../../context/DatagridThemeContext";

const OptionBar: React.FC<IDatagridOptionBar> = () => {
  const [display, setDisplay] = React.useState(false);
  const themeContext = useDatagridThemeContext();
  const themeColors = [
    "--bg",
    "--header-bg",
    "--tr-bg",
    "--line-number-bg",
    "--scroll-bar-color",
    "--status-bg",
    "--status-scroll-bar-bg",
    "--txt-header-color",
    "--txt--default-color",
  ];

  const onClick = () => {
    setDisplay((prev) => !prev);
  };

  const onMouseLeave = () => {
    setDisplay((prev) => !prev);
  };

  const onPaletteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const themeStyle = document.querySelector(`.${themeContext._theme}`) as HTMLParagraphElement;
    themeStyle.style.setProperty(e.target.name, e.target.value);
  }
  return (
    <div className="ac-datagrid--option_bar">
      <ColorToggle onClick={onClick} />
      {display && <ColorSelector onMouseLeave={onMouseLeave} />}
    </div>
  );
};

export default React.memo(OptionBar);
