import { DownArrowIcon, LeftArrowIcon } from '../../assets/icons';
import styles from './index.module.css';

export default function Share({ handleDownload, handleCreateAnother, imgKey = '' }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.headText}>
        Congrats on your
        <br /> new meme!
      </h2>
      <div className={styles.textContainer}>
        <p>
          Now, it’s time to download it and share it on the <br />
          #newfront-meme channel.
        </p>
        <br />
        <p>(Make sure to keep it internal for now!)</p>
        <br />
        <p>https://newfront.slack.com/archives/C05CZ8TS9DY</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.back} onClick={handleCreateAnother}>
          <LeftArrowIcon /> Create Another
        </button>
        <button className={styles.continue} onClick={handleDownload}>
          Download <DownArrowIcon />
        </button>
      </div>
    </div>
  );
}
