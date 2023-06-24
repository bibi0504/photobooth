import styles from './index.module.css';

export default function Spinner() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}>
                <div />
                <div />
                <div />
            </div>
        </div>
    );
}
