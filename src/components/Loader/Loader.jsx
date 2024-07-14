import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.tile01}>
        <div className={styles.mask}>AquaTrack</div>
      </div>
    </div>
  );
};

export default Loader;
