export const getToken = () => {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return null;
  }
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};
