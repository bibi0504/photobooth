import { LogoPink } from "../../assets/icons";
import styles from "./index.module.css";

export default function Header({ className }) {
  return (
    <div className={className ? className : styles.headerContainer}>
      <LogoPink className={styles.logo} />
    </div>
  );
}
