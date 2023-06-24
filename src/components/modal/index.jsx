import { useEffect } from 'react';
import styles from './index.module.css';

export default function Modal({ open, onClose, children }) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden"
  //   } else {
  //     document.body.style.overflow = "unset"
  //   }
  // }, [open])
  return open ? (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modalContent}>{children}</div>
    </>
  ) : (
    ''
  );
}
