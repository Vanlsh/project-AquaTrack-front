export const INITIAL_STATE = {
  user: {
    name: "User",
    email: null,
    gender: null,
    photo: null,
    weight: 0,
    activeTimeSports: 0,
    waterRate: 0,
  },
  token: null,
  isLoggedIn: false,
  isSuccessfullyLoggedIn: false,
  isSuccessfullyRegistered: false,
  isRefreshing: false,
  errorMessage: null,
  error: null,
};
