import { useState } from "react";

import styles from "./index.module.css";
import { RightArrowIcon } from "../../assets/icons";

const colors = ["#f028b8", "#E7FC53", "#96C6CC"];

export default function PickColor({ handleColor }) {
  const [color, setColor] = useState("#f028b8");
  const [isBlack, setTheme] = useState(true);

  const handleChangeTheme = () => {
    setTheme((prevState) => !prevState);
  };

  const PersonIcon = ({ background = "#f028b8", fill = "#222" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="108"
      height="98"
      viewBox="0 0 108 98"
      fill="none"
    >
      <g clipPath="url(#a)">
        <rect x="9" width="90" height="110" rx="45" fill={background} />
        <g clipPath="url(#b)" fill={fill}>
          <path d="M54 80c9.941 0 18-7.835 18-17.5S63.941 45 54 45s-18 7.835-18 17.5S44.059 80 54 80Z" />
          <path d="M24.02 98.778c2.975-12.223 15.453-18.903 28.372-18.903h3.216c12.92 0 25.396 6.68 28.372 18.903a54.824 54.824 0 0 1 1.29 7.354c.246 2.405-1.785 4.368-4.27 4.368H27c-2.485 0-4.516-1.963-4.27-4.368.257-2.515.715-4.99 1.29-7.354Z" />
          <path d="M44 70s20.5-6 19 0-1.5 9 0 15-19 0-19 0c2-6 2-9 0-15Z" />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h108v98H0z" />
        </clipPath>
        <clipPath id="b">
          <path fill="#fff" d="M0 23h108v105H0z" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.colorContainer}>
        {colors.map((ele, index) => (
          <div
            key={index}
            style={{ background: ele }}
            onClick={() => setColor(ele)}
            className={ele === color ? "selected" : ""}
          />
        ))}
      </div>
      <div className={styles.backgroundContainer}>
        <div className={isBlack ? "selected" : ""}>
          <div className={styles.backgroundCard} onClick={handleChangeTheme}>
            <div className="a" style={{ background: color }} />
            <PersonIcon background={color} />
            <div className="b" style={{ background: color }} />
            <div className="c" />
            <div className="c" />
          </div>
        </div>
        <div className={isBlack ? "" : "selected"}>
          <div className={styles.backgroundCard} onClick={handleChangeTheme}>
            <div className="a" style={{ background: color }} />
            <PersonIcon background={color} />
            <div className="b" style={{ background: color }} />
            <div className="c" />
            <div className="c" />
          </div>
        </div>
      </div>
      <button
        className={styles.continue}
        onClick={() => handleColor({ color, isBlack })}
      >
        Continue
        <RightArrowIcon />
      </button>
    </div>
  );
}
