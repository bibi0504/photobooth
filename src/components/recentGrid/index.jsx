import styles from "./index.module.css";

export default function Recent({ images = [] }) {
  return images.length ? (
    <div className={styles.gridContainer}>
      {images.map((src, index) => (
        <img src={src} key={index} />
      ))}
    </div>
  ) : (
    ""
  );
}
