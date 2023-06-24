import { useEffect, useRef, useState } from "react";
import {
  LeftArrow,
  LeftArrowIcon,
  MinusIcon,
  PlusIcon,
  PositionUpArrow,
  PostionDownArrow,
  RightArrow,
  RightArrowIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from "../../assets/icons";
import styles from "./index.module.css";
import AvatarEditor from "react-avatar-editor";

export default function Reposition({ outputImg, callBack, fileName }) {
  const [zoomValue, setZoomValue] = useState(1);
  const [rotateValue, setRotateValue] = useState(0);
  const [imgPosition, setImagePosition] = useState({ x: 0.5, y: 0.5 });
  const [imgString, setImgString] = useState("");
  const editorRef = useRef(null);

  const handleZoomIn = () => {
    if (zoomValue < 2) {
      setZoomValue((prevState) => {
        return prevState + 0.1;
      });
    }
  };
  const handleZoomOut = () => {
    if (zoomValue > 1) {
      setZoomValue((prevState) => {
        return prevState - 0.1;
      });
    }
  };
  const handleRotateRight = () => {
    if (rotateValue < 180) {
      setRotateValue((prevState) => {
        if (prevState + 18 > 180) return 180;
        else return prevState + 18;
      });
    }
  };
  const handleRotateLeft = () => {
    if (rotateValue > -180) {
      setRotateValue((prevState) => {
        if (prevState - 18 < -180) return -180;
        else return prevState - 18;
      });
    }
  };

  const handleUpButton = () => {
    if (imgPosition.y < 0.9) {
      setImagePosition((prevState) => {
        return {
          x: prevState.x,
          y: prevState.y + 0.1,
        };
      });
    }
  };
  const handleDownButton = () => {
    if (imgPosition.y > 0.2) {
      setImagePosition((prevState) => {
        return {
          x: prevState.x,
          y: prevState.y - 0.1,
        };
      });
    }
  };
  const handleLeftButton = () => {
    if (imgPosition.x < 0.9) {
      setImagePosition((prevState) => {
        return {
          x: prevState.x + 0.1,
          y: prevState.y,
        };
      });
    }
  };
  const handleRightButton = () => {
    if (imgPosition.x > 0.2) {
      setImagePosition((prevState) => {
        return {
          x: prevState.x - 0.1,
          y: prevState.y,
        };
      });
    }
  };

  const loadImage = (url) =>
    fetch(url, { headers: { "Access-Control-Allow-Origin": "*" } })
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            console.log(blob);
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      )
      .catch((ex) => console.log(ex));

  const handleContinue = async () => {
    if (editorRef) {
      const dataUrl = editorRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      callBack(URL.createObjectURL(blob));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <div className={styles.imageContainer}>
          <div className={styles.avatarContainer}>
            <AvatarEditor
              ref={editorRef}
              image={outputImg || ""}
              className={styles.avatar}
              crossOrigin="*"
              border={0}
              scale={zoomValue}
              rotate={rotateValue}
              position={imgPosition}
              width={280}
              height={337}
              disableBoundaryChecks={true}
            />
          </div>
        </div>
        <div className={styles.controlsContainer}>
          <div className={styles.positionButton}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div className={styles.arrowBackground} onClick={handleUpButton}>
                <PositionUpArrow />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                className={styles.arrowBackground}
                onClick={handleLeftButton}
              >
                <LeftArrow />
              </div>
              <div
                className={styles.arrowBackground}
                onClick={handleDownButton}
              >
                <PostionDownArrow />
              </div>
              <div
                className={styles.arrowBackground}
                onClick={handleRightButton}
              >
                <RightArrow />
              </div>
            </div>
          </div>
          <div className={styles.transitionButton}>
            <div className={styles.sliderContainer}>
              <MinusIcon
                onClick={handleZoomOut}
                style={{ cursor: "pointer" }}
              />
              <input
                type="range"
                min="1"
                max="2"
                className={styles.slider}
                id="zoom"
                step={0.1}
                value={zoomValue}
                onChange={(e) => setZoomValue(e.target.valueAsNumber)}
              />
              <PlusIcon onClick={handleZoomIn} style={{ cursor: "pointer" }} />
            </div>
            <div className={styles.sliderContainer}>
              <RotateLeftIcon
                onClick={handleRotateLeft}
                style={{ cursor: "pointer" }}
              />
              <input
                type="range"
                min="-180"
                max="180"
                className={styles.slider}
                id="rotate"
                value={rotateValue}
                onChange={(e) => {
                  setRotateValue(e.target.valueAsNumber);
                }}
              />
              <RotateRightIcon
                onClick={handleRotateRight}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.secondRow}>
        <button
          className={styles.retakeSelfie}
          onClick={() => {
            callBack(null);
          }}
        >
          <LeftArrowIcon /> Retake Selfie
        </button>
        <button className={styles.continue} onClick={handleContinue}>
          Continue <RightArrowIcon />
        </button>
      </div>
    </div>
  );
}
