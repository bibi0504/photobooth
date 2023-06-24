import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";
import {
  DeliverResultsIcon,
  LogoPink,
  RightArrowIcon,
} from "../../assets/icons";
import SocialImg0 from "../../assets/images/Social.png";
import SocialImg1 from "../../assets/images/Social1.png";
import SocialImg2 from "../../assets/images/Social2.png";
import SocialImg3 from "../../assets/images/Social3.png";
import SocialImg4 from "../../assets/images/Social4.png";
import SocialImg5 from "../../assets/images/Social5.png";
import Social from "../../assets/images/Social.gif";
import Header from "../../components/header";

export default function Home() {
  let index = 0;
  const cardRef = useRef();
  const arr = [
    SocialImg0,
    SocialImg1,
    SocialImg2,
    SocialImg3,
    SocialImg4,
    SocialImg5,
  ];
  arr.map((ele) => (document.createElement("img").src = ele));
  const navigate = useNavigate();

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   cardRef.current && (cardRef.current.src = arr[index])
    //   if (index === 5) {
    //     index = 0
    //   } else {
    //     index++
    //   }
    // }, 2000)
    // return () => clearInterval(intervalId)
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Header className={styles.header} />
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContent}>
            <div className={styles.leftContainer}>
              <DeliverResultsIcon className={styles.icon} />
              <div className={styles.divider} />
              <h2 className={styles.heading}>Work, Love,</h2>
              <h2 className={styles.heading} style={{ fontStyle: "italic" }}>
                MEME!
              </h2>
              <p className={styles.info}>
                Welcome to the new frontier! Are you an{" "}
                <span>empowered expert</span>, an{" "}
                <span>impactful innovator</span>, or a{" "}
                <span>galvanized go-getter</span>?
              </p>
              <p className={styles.info}>
                Choose your persona and pair it with one of our vibrant new
                brand colors and a lighthearted statement about our business to
                create a fun meme celebrating the Newfront brand launch.
              </p>
              <button
                className={styles.begin}
                onClick={() => navigate("/generate")}
              >
                Let’s begin <RightArrowIcon />
              </button>
            </div>
            <div className={styles.rightContainer}>
              <img
                id="CardImg"
                src={Social}
                alt="card"
                ref={cardRef}
                className={styles.imageStyle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
