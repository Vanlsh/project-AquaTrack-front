import { lazy, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getUserInfo } from "../redux/auth/operations.js";
import {
  selectAuthErrorMessage,
  selectAuthSuccessMessage,
  selectToken,
} from "../redux/auth/selectors.js";
import { setLoggedIn } from "../redux/auth/slice.js";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import SharedLayout from "./SharedLayout/SharedLayout.jsx";
import {
  selectDailyErrorMessage,
  selectDailySuccessMessage,
} from "../redux/water/selectors.js";
import { refreshToken } from "../redux/auth/operations.js";
import Loader from "./Loader/Loader.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage.jsx"));
const TrackerPage = lazy(() => import("../pages/TrackerPage/TrackerPage.jsx"));
const NotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage.jsx")
);
const WaterIntakeChart = lazy(
  () => import("./CalendarChart/CalendarChart.jsx")
);
const Calendar = lazy(() => import("./Calendar/Calendar.jsx"));

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const authErrorMessage = useSelector(selectAuthErrorMessage);
  const authSuccessMessage = useSelector(selectAuthSuccessMessage);
  const waterErrorMessage = useSelector(selectDailyErrorMessage);
  const waterSuccessMessage = useSelector(selectDailySuccessMessage);

  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(refreshToken()).then(({ error }) => {
        if (!error) {
          dispatch(getUserInfo());
          dispatch(setLoggedIn(true));
        }
        setIsRefreshed(true);
      });
    } else {
      setIsRefreshed(true);
    }
  }, []);

  //AUTH TOAST
  useEffect(() => {
    if (authErrorMessage) {
      toast.error(authErrorMessage);
    }
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    }
  }, [authSuccessMessage, authErrorMessage]);

  //WATER TOAST
  useEffect(() => {
    if (waterErrorMessage) {
      toast.error(waterErrorMessage);
    }
    if (waterSuccessMessage) {
      toast.success(waterSuccessMessage);
    }
  }, [waterErrorMessage, waterSuccessMessage]);

  if (!isRefreshed)
    return (
      <SharedLayout>
        <Loader />
      </SharedLayout>
    );
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
        >
          <Route path="calendar" element={<Calendar />} />
          <Route path="schedule" element={<WaterIntakeChart />} />
          <Route index element={<Navigate to="calendar" replace />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            fontWeight: "700",
            color: "white",
            borderRadius: "15px",
            backgroundColor: "#323F47",
          },
          success: {
            iconTheme: {
              primary: "#9BE1A0",
              secondary: "#FFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF5050",
              secondary: "#F0EFF4",
            },
          },
        }}
        position="top-right"
      />
    </SharedLayout>
  );
}

export default App;
