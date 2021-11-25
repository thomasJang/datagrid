import * as React from "react";
import { ThemeContextActionTypes } from "../../@interface";
import { useDatagridThemeContext,
  useDatagridThemeDispatch
} from "../../context/DatagridThemeContext";
import { presetItems } from "./themeItems/ThemePreset";
import { themeProperties } from "./themeItems/ThemeProperties";
interface IPros {
  onMouseLeave: () => void;
}

const ColorSelector: React.FC<IPros> = (props) => {
  const { onMouseLeave } = props;
  const colorContext = useDatagridThemeContext();
  const colorDispatch = useDatagridThemeDispatch();

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const themeStyle = document.querySelector(`.${colorContext._theme}`) as HTMLParagraphElement;

    themeProperties.map((prop) => (
      themeStyle.style.removeProperty(prop)
    ))
    colorDispatch({
      type: ThemeContextActionTypes.SET_THEME,
      theme: e.currentTarget.innerText,
    });
  };

  return (
    <div className="ac-datagrid--option_bar__color_selector" onMouseLeave={onMouseLeave}>
      <ul className="color_selector__list">
        <li className="color_selector__item">
          {
            (presetItems || []).map((item, index) => (
              <div onClick={onClickHandler} key={index}>{item}</div>
            ))
          }
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ColorSelector);
