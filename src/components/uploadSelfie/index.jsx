import { useEffect, useMemo, useRef, useState } from "react"
import Compressor from "compressorjs"
import { toast } from "react-toastify"

import {
  CameraIcon,
  CrossIcon,
  LeftArrowIcon,
  PhotoroomIcon,
  RightArrowIcon,
  UploadIcon,
} from "../../assets/icons"
import styles from "./index.module.css"
import CaptureSelfie from "./capture"
import Spinner from "../spinner"
import Upload from "../../assets/icons/upload.png"
import Camera from "../../assets/icons/camera.png"
import { axiosInstance } from "../../config/api"

export default function UploadSelfie({ handleModalClose, handleUpdateImg }) {
  const [source, setSource] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const [imageData, setImageData] = useState({})

  const inputRef = useRef()

  const handleUpload = () => {
    setSource("file")
  }

  const handleCapture = () => {
    setSource("camera")
  }

  const handleUploadClick = () => {
    inputRef.current.click()
  }

  const compressImage = (file) => {
    const fileSize = file.size
    const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2)

    if (sizeInMB > 1.0) {
      new Compressor(file, {
        quality: 0.6,
        success: (compressedResult) => {
          // setSelectedImage(URL.createObjectURL(compressedResult))
          setImgFile(compressedResult)
        },
      })
    } else {
      setImgFile(file)
    }
  }

  const uploadImage = () => {
    if (imgFile.size > 5e6) {
      toast.warn("Please upload a file smaller than 5 MB")
      setImgFile(null)
      setSource((prevState) => (prevState === "camera" ? null : prevState))
    } else {
      setShowSpinner(true)
      const formData = new FormData()
      formData.append("image_file", imgFile)
      axiosInstance
        .post("removeBG", formData)
        .then((res) => {
          if (res.status === 200 && res.data) {
            setImageData(res.data)
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error("Something went wrong!")
        })
        .finally(() => setShowSpinner(false))
    }
  }

  useEffect(() => {
    if (source === "camera" && imgFile) {
      uploadImage()
    }
  }, [imgFile])

  const handleClearFile = () => {
    setSource(null)
    setImgFile(null)
  }

  const handleInputChange = (event) => {
    console.log(event.target.files[0])
    compressImage(event.target.files[0])
    setSource("file")
  }

  const handleBack = () => {
    setImageData({})
  }

  const Input = () =>
    useMemo(
      () => (
        <input
          id='uploadImage'
          name='uploadImage'
          style={{ display: "none" }}
          type='file'
          accept='.png, .jpg, .jpeg'
          ref={inputRef}
          onChange={handleInputChange}
        />
      ),
      [],
    )

  return (
    <div className={styles.container}>
      {imageData?.id ? (
        <div className={styles.selfieContainer}>
          <div className={styles.selfieImg}>
            <img
              alt='selfie_without_background'
              src={imageData.outputImageURL}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className={styles.watermark}>
            <div className={styles.photoroomIcon}>
              <PhotoroomIcon />
            </div>
            <div>
              <p>Background removed by</p>
              <h4>Photoroom</h4>
            </div>
          </div>
          <div className={styles.backArrowContainer} style={{ display: "flex", gap: "32px" }}>
            <button onClick={handleBack}>
              <LeftArrowIcon /> Back
            </button>
            <button className={styles.continue} onClick={() => handleUpdateImg(imageData)}>
              Continue <RightArrowIcon />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.titleContainer}>
            <p className={styles.modalTitle}>Upload a selfie</p>
            <p className={styles.close} onClick={handleModalClose}>
              <CrossIcon />
            </p>
          </div>
          <p className={styles.info}>
            Hit us with your best shot. Take a selfie or upload your favorite photo to the star of
            this meme!
          </p>
          {source ? (
            source === "file" ? (
              <>
                {/* {imgFile ? ( */}
                {imgFile && (
                  <>
                    <div className={styles.uploadImage}>
                      <img alt='imageFile' src={URL.createObjectURL(imgFile)} />
                    </div>
                  </>
                )}
                {/* ) : (
                  <button className={styles.uploadButton} type='button' onClick={handleUploadClick}>
                    <UploadIcon />
                    <p>Click to Upload</p>
                  </button>
                )} */}
                <div className={styles.backArrowContainer}>
                  <button onClick={handleClearFile}>
                    <LeftArrowIcon /> Back
                  </button>
                  {imgFile ? (
                    <button className={styles.continue} onClick={uploadImage}>
                      Upload
                      <UploadIcon />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              <CaptureSelfie handleSetImg={compressImage} />
            )
          ) : (
            <div className={styles.buttonContainer}>
              <button type='button' onClick={handleCapture}>
                <img src={Camera} />
                <p>TAKE A SELFIE</p>
              </button>
              <button type='button' onClick={handleUploadClick}>
                <img src={Upload} />
                <p>UPLOAD A SELFIE</p>
              </button>
            </div>
          )}
          <Input />
          {source === "file" ? (
            ""
          ) : (
            <p className={styles.info}>
              PRO TIP: <br />
              For best results hold your device further back and make sure you are in a well lit
              place.
            </p>
          )}
          {showSpinner ? <Spinner /> : ""}
        </>
      )}
    </div>
  )
}
