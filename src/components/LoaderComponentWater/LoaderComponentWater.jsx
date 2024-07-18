import styles from "./LoaderComponentWater.module.css";

const LoaderComponentWater = ({ width, height }) => {
  return (
    <div className={styles.loaderContainer}>
      <div
        style={{ width: width, height: height }}
        className={styles.loader}
      ></div>
    </div>
  );
};

export default LoaderComponentWater;
