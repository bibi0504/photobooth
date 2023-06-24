import { useEffect, useRef, useState } from "react";

import styles from "./index.module.css";
import { LogoWhite, RightArrowIcon, Pattern2, Pattern3, CrossIcon } from "../../assets/icons";
import Modal from "../../components/modal";
import UploadSelfie from "../../components/uploadSelfie";
import PickPersona from "../../components/pickPersona";
import Reposition from "../../components/reposition";
import PickColor from "../../components/pickColor";
import Spinner from "../../components/spinner";
import Share from "../../components/share";
import { toBlob, toPng } from "html-to-image";
import { axiosInstance } from "../../config/api";
import { toast } from "react-toastify";
import Compressor from "compressorjs";
import Recent from "../../components/recentGrid";
import Header from "../../components/header";
import MainCard from "../../components/mainCard";

const defaultColor = { color: "#f028b8", isBlack: false };
const defaultImage = null;
const defaultPersona = { persona: "Impactful Innovator", subText: "De-risky business" };

export default function Generate() {
    const [modalOpen, setModalOpen] = useState(false);
    const [step, changeStep] = useState(1);
    const [repositionedImage, setRepositionedImage] = useState(defaultImage);
    const [persona, setPersona] = useState(defaultPersona);
    const [color, setColor] = useState(defaultColor);
    const [imgData, setImage] = useState({});
    const [isDownload, setIsDownload] = useState(false);
    const [finalImage, setFinalImage] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [recent, setRecent] = useState([]);

    const cardRef = useRef();

    const handleModalClose = () => {
        setModalOpen((prevState) => !prevState);
    };

    const handleUpdateImg = (value) => {
        setImage(value);
        changeStep(2);
    };

    const handleChangeStep = () => {
        // changeStep(2)
        window.scrollTo(0, 0);
        handleModalClose();
    };

    const compressImage = (file) => {
        const fileSize = file.size;
        const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);

        if (sizeInMB > 1.0) {
            new Compressor(file, {
                quality: 0.6,
                success: (compressedResult) => {
                    // setSelectedImage(URL.createObjectURL(compressedResult))
                    handleUploadFinal(compressedResult);
                },
            });
        } else {
            handleUploadFinal(file);
        }
    };

    const handleFetchRecent = () => {
        axiosInstance
            .get("getAllImages")
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setRecent(res.data.resultImages);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUploadFinal = (file) => {
        console.log("here");

        setShowSpinner(true);
        const formData = new FormData();
        formData.append("image_file", file);
        formData.append("id", imgData.id);
        formData.append("imageKey", imgData.imageKey);
        axiosInstance
            .post("uploadFinalImage", formData)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setFinalImage(res.data);
                    // toast.success("Image uploaded successfully!")
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setShowSpinner(false);
                handleFetchRecent();
            });
    };

    const handleDownload = () => {
        toPng(cardRef.current, {
            backgroundColor: "transparent",
        })
            .then((image) => {
                const imageData = image;

                const a = document.createElement("a");
                a.href = imageData;
                a.download = "Image.png";
                a.click();
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    const getImage = () => {
        toBlob(cardRef.current, {
            backgroundColor: "transparent",
        })
            .then((image) => {
                const imageData = image;
                const file = new File([imageData], imgData.fileName, { type: 'image/png' });
                compressImage(file);
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    const handleReposition = (img) => {
        if (img) {
            setRepositionedImage(img);
            changeStep(3);
        } else {
            setImage({});
            changeStep(1);
        }
    };

    const handleClearStep = () => {
        changeStep(1);
        setRepositionedImage(null);
        setColor(defaultColor);
        setImage({});
        setPersona(defaultPersona);
        setIsDownload(false);
        setRecent([]);
    };

    useEffect(() => {
        if (color.color) {
            getImage();
        }
    }, [color]);

    console.log(color, repositionedImage, persona);

    return (
        <>
            <section className={styles.section}>
                <Header className={styles.header} />
                <div className={styles.mainContainer}>
                    <div className={styles.mainContent}>
                        <div className={styles.leftContainer}>
                            <div className={styles.selfieCard} ref={cardRef}>
                                <MainCard color={color} persona={persona} img={repositionedImage} />
                            </div>
                        </div>
                        {isDownload ? (
                            <div className={styles.rightContainer}>
                                <Share
                                    handleDownload={handleDownload}
                                    handleCreateAnother={handleClearStep}
                                    imgKey={finalImage ? imgData.imageKey : ""}
                                />
                            </div>
                        ) : (
                            <div className={styles.rightContainer}>
                                <h4 className={styles.subHead}>
                                    Navigator selfie
                                    <br /> generator
                                </h4>
                                <p className={styles.desc}>
                                    Start with a photo then follow the steps below to personalize your meme.
                                </p>
                                <button className={styles.button} type='button' disabled={true}>
                                    Upload a selfie<p>1</p>
                                </button>
                                <button className={styles.button} type='button' disabled={true}>
                                    Reposition photo<p>2</p>
                                </button>
                                <button className={styles.button} type='button' disabled={true}>
                                    Pick your persona & fun statement<p>3</p>
                                </button>
                                <button className={styles.button} type='button' disabled={true}>
                                    Choose your colors<p>4</p>
                                </button>
                                <button className={styles.continue} onClick={handleChangeStep}>
                                    Continue <RightArrowIcon />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {showSpinner ? <Spinner /> : ""}
                <Recent images={recent?.slice(1)} />
            </section>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <div className={styles.modalContent}>
                    {step === 1 ? (
                        ""
                    ) : (
                        <div className={styles.titleContainer}>
                            <p className={styles.modalTitle}>
                                {step === 2
                                    ? "Position your selfie"
                                    : step === 3
                                    ? "Pick your persona"
                                    : "Select a color"}
                            </p>
                            <p className={styles.close} onClick={handleModalClose}>
                                <CrossIcon />
                            </p>
                        </div>
                    )}
                    {step === 1 ? (
                        <UploadSelfie handleModalClose={handleModalClose} handleUpdateImg={handleUpdateImg} />
                    ) : step === 3 ? (
                        <PickPersona
                            handlePersona={(value) => {
                                setPersona(value);
                                changeStep(4);
                            }}
                        />
                    ) : step === 2 ? (
                        <Reposition
                            outputImg={imgData.outputImageURL}
                            fileName={imgData.fileName || ""}
                            callBack={handleReposition}
                        />
                    ) : step === 4 ? (
                        <PickColor
                            handleColor={(value) => {
                                setColor(value);
                                setIsDownload(true);
                                setModalOpen(false);
                            }}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </Modal>
        </>
    );
}
