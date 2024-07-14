import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { refreshUser } from "../redux/auth/operations.js";
import { selectIsRefreshing, selectToken } from "../redux/auth/selectors.js";
import Loader from "./Loader/Loader.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import SharedLayout from "./SharedLayout/SharedLayout.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage.jsx"));
const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage.jsx"));
const NotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage.jsx"),
);

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser(token));
  }, [dispatch, token]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* <Route path="/signup" element={<SignUpPage />} /> */}

        <Route
          path="/signup"
          element={
            <RestrictedRoute
              redirectTo={`/tracker/${Date.now()}`}
              component={<SignUpPage />}
            />
          }
        />

        <Route
          path="/signin"
          element={
            <RestrictedRoute
              redirectTo={`/tracker/${Date.now()}`}
              component={<SignInPage />}
            />
          }
        />

        <Route
          path="/tracker/:date"
          element={
            <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
