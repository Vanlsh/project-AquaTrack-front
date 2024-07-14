import React, { lazy, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "../redux/auth/operations.js";
import {
  selectError,
  selectIsRefreshing,
  selectIsSuccessfullyLoggedIn,
  selectIsSuccessfullyRegistered,
  selectToken,
} from "../redux/auth/selectors.js";
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
  const isLoggedIn = useSelector(selectIsRefreshing);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isSuccessfullyLoggedIn = useSelector(selectIsSuccessfullyLoggedIn);
  const isSuccessfullyRegistered = useSelector(selectIsSuccessfullyRegistered);
  const error = useSelector(selectError);

  useEffect(() => {
    if (token) {
      // dispatch(refreshUser);
    }
  }, [dispatch]);

  useEffect(() => {
    if (error === 401) {
      dispatch(refreshUser);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccessfullyLoggedIn) {
      toast.success("Successfully logged in");
    }
    if (isSuccessfullyRegistered) {
      toast.success("Successfully registered");
    }
  }, [isSuccessfullyLoggedIn, isSuccessfullyRegistered]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <SharedLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />

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
        <Toaster position="top-right" />
      </SharedLayout>
    </>
  );
}

export default App;
