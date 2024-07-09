import { Suspense } from "react";
import css from "./SharedLayout.module.css";

const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default SharedLayout;
