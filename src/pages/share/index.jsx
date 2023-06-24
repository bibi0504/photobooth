import { useRef } from "react";
import html2canvas from "html2canvas";

import styles from "./index.module.css";
import {
  DeliverResultsIcon,
  LogoWhite,
  RightArrowIcon,
  Impactful2,
  LogoPink,
  Pattern2,
  Pattern3,
  DownArrowIcon,
  LeftArrowIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  TiktokIcon,
} from "../../assets/icons";
import testImgSrc from "../../assets/images/testImg.png";

export default function ShareSelfie() {
  const cardRef = useRef();

  const handleDownload = () => {
    const card = cardRef.current;
    // card.style.width = "638px";
    // card.style.height = "638px";
    html2canvas(card, {
      backgroundColor: "transparent",
      width: 638,
      height: 638,
    })
      .then((canvas) => {
        const imageData = canvas.toDataURL("image/png");
        // card.style = ""
        const a = document.createElement("a");
        a.href = imageData;
        a.download = "Image.png";
        a.click();
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    <section className={styles.section}>
      <LogoWhite className={styles.logo} />
      <div className={styles.container}>
        <div>
          <div className={styles.selfieCard} id="selfieCard" ref={cardRef}>
            <div>
              <div className={styles.persona}>IMPACTFUL INNOVATOR</div>
              <div className={styles.sticker}>
                <Impactful2 />
              </div>
              <div className={styles.cardTitle}>
                <LogoPink />
              </div>
              <Pattern2 className={styles.pattern} />
              <div className={styles.rect}>
                <img
                  src={testImgSrc}
                  alt="selfie"
                  className={styles.selfieImg}
                />
              </div>
              <div className={styles.patternBottom}>
                <Pattern3 />
              </div>
              <div className={styles.footerText}>
                <p>New brand,</p>
                <p>same sense of humor</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={styles.headText}>Download and Share your Selfie</h2>
          <div className={styles.iconContainer}>
            <LinkedInIcon />
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
            <TiktokIcon />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.back}>
              <LeftArrowIcon /> Create Another
            </button>
            <button className={styles.continue} onClick={handleDownload}>
              Download <DownArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
