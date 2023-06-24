import { useEffect, useRef, useState } from 'react';

import styles from './index.module.css';
import {
    LogoWhite,
    RightArrowIcon,
    LogoPink,
    Pattern2,
    Pattern3,
    CrossIcon,
    Empowered1,
    Empowered2,
    Empowered3,
    Impactful1,
    Impactful2,
    Impactful3,
    Galvanized1,
    Galvanized2,
    Galvanized3,
} from '../../assets/icons';
import CardPattern from '../../assets/icons/cardPattern.svg';
import Modal from '../../components/modal';
import UploadSelfie from '../../components/uploadSelfie';
import PickPersona from '../../components/pickPersona';
import Reposition from '../../components/reposition';
import PickColor from '../../components/pickColor';
import Spinner from '../../components/spinner';
import Share from '../../components/share';
import html2canvas from 'html2canvas';
import { axiosInstance } from '../../config/api';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';
import Recent from '../../components/recentGrid';
import Header from '../../components/header';

const personaSticker = {
    'Don’t quote me on this': Empowered2,
    'Dude, where’s my COI?': Empowered1,
    'Friends with benefits': Empowered3,
    'What can AI do for you?': Impactful1,
    'De-risky business': Impactful3,
    'Fax intolerant': Impactful2,
    'From ABC to IPO': Galvanized1,
    'Shop local, go public': Galvanized2,
    'Grow forth': Galvanized3,
};

export default function Generate() {
    const [modalOpen, setModalOpen] = useState(false);
    const [step, changeStep] = useState(1);
    const [repositionedImage, setRepositionedImage] = useState();
    const [persona, setPersona] = useState({});
    const [color, setColor] = useState({});
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
            .get('getAllImages')
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
        setShowSpinner(true);
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('id', imgData.id);
        formData.append('imageKey', imgData.imageKey);
        axiosInstance
            .post('uploadFinalImage', formData)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setFinalImage(res.data);
                    // toast.success("Image uploaded successfully!")
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setShowSpinner(false);
                handleFetchRecent();
            });
    };

    const handleDownload = () => {
        html2canvas(cardRef.current, {
            backgroundColor: 'transparent',
            windowWidth: 1920,
            windowHeight: 1080,
        })
            .then((canvas) => {
                const imageData = canvas.toDataURL('image/png');

                const a = document.createElement('a');
                a.href = imageData;
                a.download = 'Image.png';
                a.click();
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    const getImage = () => {
        html2canvas(cardRef.current, {
            backgroundColor: 'transparent',
            windowWidth: 1920,
            windowHeight: 1080,
        })
            .then((canvas) => {
                const imageData = canvas.toDataURL('image/png');
                // console.log(imageData)
                const arr = imageData.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[arr.length - 1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const file = new File([u8arr], imgData.fileName, { type: mime });
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
        setColor({});
        setImage({});
        setPersona({});
        setIsDownload(false);
        setRecent([]);
    };

    const Sticker = () => {
        if (persona?.subText) {
            const PersonaText = personaSticker[persona?.subText];
            return <PersonaText className={styles.sticker + (color.isBlack ? ' black' : ' white')} />;
        }
        return <Impactful3 className={styles.sticker + (color.isBlack ? ' black' : ' white')} />;
    };

    useEffect(() => {
        if (color.color) {
            getImage();
        }
    }, [color]);

    const getBackgroundAndTextColor = () => {
        return color?.color
            ? {
                  backgroundColor: color.color,
                  color: color.color === '#f028b8' ? 'white' : '#152023',
              }
            : {
                  backgroundColor: '#f028b8',
                  color: 'white',
              };
    };

    return (
        <>
            <section className={styles.section}>
                <Header className={styles.header} />
                <div className={styles.mainContainer}>
                    <div className={styles.mainContent}>
                        <div className={styles.leftContainer}>
                            <div className={styles.selfieCard} ref={cardRef}>
                                <div
                                    style={{
                                        background: `${color.isBlack ? '#000' : '#fff'} url(${CardPattern})`,
                                        borderColor: color.color || '#f028b8',
                                    }}
                                    className={styles.cardContainer}
                                >
                                    <div className={styles.cardTitle}>
                                        <LogoPink />
                                    </div>
                                    {/* <div className={styles.pattern}>
                                        <Pattern2 />
                                    </div>
                                    <div className={styles.patternBottom}>
                                        <Pattern3 />
                                    </div> */}
                                    {repositionedImage ? (
                                        <div
                                            className={styles.repositionedImageContainer}
                                            style={{ background: color.color || '#f028b8' }}
                                        >
                                            <img src={repositionedImage} alt="" className={styles.repositionedImage} />
                                        </div>
                                    ) : (
                                        <div className={styles.rect} />
                                    )}
                                    <div className={styles.persona} style={getBackgroundAndTextColor()}>
                                        {persona?.persona || 'IMPACTFUL INNOVATOR'}
                                    </div>
                                    <Sticker />
                                    <div
                                        className={styles.footerText}
                                        style={{ color: color.isBlack ? '#fff' : '#121212' }}
                                    >
                                        <p>New brand,</p>
                                        <p>same sense of humor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isDownload ? (
                            <div className={styles.rightContainer}>
                                <Share
                                    handleDownload={handleDownload}
                                    handleCreateAnother={handleClearStep}
                                    imgKey={finalImage ? imgData.imageKey : ''}
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
                                <button className={styles.button} type="button" disabled={true}>
                                    Upload a selfie<p>1</p>
                                </button>
                                <button className={styles.button} type="button" disabled={true}>
                                    Reposition photo<p>2</p>
                                </button>
                                <button className={styles.button} type="button" disabled={true}>
                                    Pick your persona & fun statement<p>3</p>
                                </button>
                                <button className={styles.button} type="button" disabled={true}>
                                    Choose your colors<p>4</p>
                                </button>
                                <button className={styles.continue} onClick={handleChangeStep}>
                                    Continue <RightArrowIcon />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {showSpinner ? <Spinner /> : ''}
                <Recent images={recent?.slice(1)} />
            </section>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <div className={styles.modalContent}>
                    {step === 1 ? (
                        ''
                    ) : (
                        <div className={styles.titleContainer}>
                            <p className={styles.modalTitle}>
                                {step === 2
                                    ? 'Position your selfie'
                                    : step === 3
                                    ? 'Pick your persona'
                                    : 'Select a color'}
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
                            fileName={imgData.fileName || ''}
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
                        ''
                    )}
                </div>
            </Modal>
        </>
    );
}
