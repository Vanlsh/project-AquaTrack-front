import { lazy, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getUserInfo } from "../redux/auth/operations.js";
import {
  selectAuthErrorMessage,
  selectAuthSuccessMessage,
  selectToken,
} from "../redux/auth/selectors.js";
import { setLoggedIn } from "../redux/auth/slice.js";
import {
  selectDailyErrorMessage,
  selectDailySuccessMessage,
  selectMonthlyErrorMessage,
  selectMonthlySuccessMessage,
} from "../redux/water/selectors.js";
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
  const authSuccessMessage = useSelector(selectAuthSuccessMessage);
  const authErrorMessage = useSelector(selectAuthErrorMessage);
  const waterDailyErrorMessage = useSelector(selectDailyErrorMessage);
  const waterDailySuccessMessage = useSelector(selectDailySuccessMessage);
  const waterMonthlyErrorMessage = useSelector(selectMonthlyErrorMessage);
  const waterMonthlySuccessMessage = useSelector(selectMonthlySuccessMessage);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo(token));
      dispatch(setLoggedIn(true));
    }
  }, [token, dispatch]);

  //AUTH TOAST
  useEffect(() => {
    if (authErrorMessage) {
      toast.error(authErrorMessage);
    }
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    }
  }, [authSuccessMessage, authErrorMessage]);

  //WATER DAILY TOAST
  useEffect(() => {
    if (waterDailyErrorMessage) {
      toast.error(waterDailyErrorMessage);
    }
    if (waterDailySuccessMessage) {
      toast.success(waterDailySuccessMessage);
    }
  }, [waterDailySuccessMessage, waterDailySuccessMessage]);

  //WATER MONTHLY TOAST
  useEffect(() => {
    if (waterMonthlyErrorMessage) {
      toast.error(waterMonthlyErrorMessage);
    }
    if (waterMonthlySuccessMessage) {
      toast.success(waterMonthlySuccessMessage);
    }
  }, [waterMonthlySuccessMessage, waterMonthlyErrorMessage]);

  return (
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
  );
}

export default App;
