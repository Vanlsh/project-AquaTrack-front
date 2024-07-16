export const selectUser = (state) => state.auth.user;
export const selectUserName = (state) => state.auth.user.name;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectUserPhoto = (state) => state.auth.photo;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectToken = (state) => state.auth.token;
export const selectIsSuccessfullyLoggedIn = (state) =>
  state.auth.isSuccessfullyLoggedIn;
export const selectIsSuccessfullyRegistered = (state) =>
  state.auth.isSuccessfullyRegistered;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
