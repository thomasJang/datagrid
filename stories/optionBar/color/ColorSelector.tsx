import * as React from "react";
import { presetItems } from "../themeItems/ThemePreset";
import { themeProperties } from "../themeItems/ThemeProperties";

interface IPros {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  onMouseLeave: () => void;
}

const ColorSelector: React.FC<IPros> = (props) => {
  const { onMouseLeave, setTheme } = props;

  const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
    (e) => {
      const themeStyle = document.documentElement.querySelector(
        ".ac-datagrid"
      ) as HTMLElement;
      (themeProperties || []).map((prop) =>
        themeStyle.style.removeProperty(prop)
      );
      setTheme(e.currentTarget.innerHTML);
    },
    [setTheme]
  );

  return (
    <div
      className="ac-datagrid--option_bar__color_selector"
      onMouseLeave={onMouseLeave}
    >
      <ul className="color_selector__list">
        {(presetItems || []).map((item, index) => (
          <li className="color_selector__item" onClick={onClick} key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ColorSelector);
