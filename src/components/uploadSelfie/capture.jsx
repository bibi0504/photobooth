import { useEffect, useRef, useState } from "react";

import { CameraIcon, RetakeIcon, TickMarkIcon } from "../../assets/icons";
import styles from "./index.module.css";

export default function CaptureSelfie({ handleSetImg }) {
    const [imgSrc, setImgSrc] = useState("");
    const [error, setError] = useState("");
    const [hasPermission, setPermission] = useState(null);

    const videoRef = useRef();
    const streamRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const devicesMedia = navigator.mediaDevices.getUserMedia;
        if (devicesMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: true,
                })
                .then(function (stream) {
                    const video = videoRef.current;
                    streamRef.current = stream;
                    video.srcObject = stream;
                    // video.play()
                    setPermission(true);
                })
                .catch((err) => {
                    setError(() => {
                        if (
                            err.message === "The object can not be found here." ||
                            err.message === "Invalid constraint"
                        ) {
                            return "No camera found";
                        }
                        return err.message;
                    });
                    console.error(err);
                });
        }
        return () => {
            if (streamRef.current) {
                const tracks = streamRef.current.getTracks();

                tracks.forEach((track) => {
                    track.stop();
                });
            }
        };
    }, []);

    const getImage = async () => {
        const res = await fetch(imgSrc);
        const blob = await res.blob();
        return new File([blob], `Capture_${new Date().toISOString()}`, { type: "image/png" });
    };

    const handleConfirm = async () => {
        const file = await getImage();
        handleSetImg(file);
    };

    const handleRetake = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setImgSrc("");
    };

    const handleCapture = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const width = videoRef.current.videoWidth,
            height = videoRef.current.videoHeight;
        canvas.width = width;
        canvas.height = height;
        console.log(width, height);
        context.drawImage(videoRef.current, 0, 0, width, height);

        const data = canvas.toDataURL("image/png");
        setImgSrc(data);
        // handleDisableCamera()
    };

    return (
        <div className={styles.videoContainer}>
            <video
                width='inherit'
                height='auto'
                ref={videoRef}
                autoPlay
                playsInline
                style={{ display: imgSrc ? "none" : "block" }}
            />
            <div className={styles.captureContainer} style={{ justifyContent: imgSrc ? "space-between" : "center" }}>
                {imgSrc ? (
                    <>
                        <button onClick={handleRetake}>
                            <RetakeIcon />
                        </button>
                        <button onClick={handleConfirm}>
                            <TickMarkIcon />
                        </button>
                    </>
                ) : hasPermission ? (
                    <button onClick={handleCapture}>
                        <CameraIcon />
                    </button>
                ) : (
                    <p className={styles.errorMsg}>
                        {(error === "Requested device not found" ? "No media device found" : error) || ""}
                    </p>
                )}
            </div>
            <canvas ref={canvasRef} />
            <img alt='selfie' src={imgSrc} style={{ display: imgSrc ? "block" : "none" }} />
        </div>
    );
}
