import * as React from "react";
import { themeProperties, themeLabel } from "../themeItems/ThemeProperties";

interface IPros {
  onClick: () => void;
}

const CustomSelector: React.FC<IPros> = (props) => {
  const { onClick } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const themeStyle = document.documentElement.querySelector(
      ".ac-datagrid"
    ) as HTMLElement;
    themeStyle.style.setProperty(e.target.name, e.target.value);
  };

  return (
    <div className="ac-datagrid--option_bar__custom_selector">
      <ul className="color_selector__list">
        {(themeProperties || []).map((prop, index) => (
          <li className="color_selector__item" key={index}>
            <label>{themeLabel[index]}</label>
            <input type="color" onChange={onChange} name={prop} key={index} />
          </li>
        ))}
        <li className="color_selector__item">
          <button className="color_selector__btn" onClick={onClick}>
            Done
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(CustomSelector);
