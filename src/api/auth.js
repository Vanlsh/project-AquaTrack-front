import { instance } from "../axios.js";

export const signupUser = async (userInfo) => {
  const data = await instance.post("/user/signup", userInfo);
  return data;
};

export const loginUser = async (userInfo) => {
  const data = await instance.post("/users/login", userInfo);
  return data;
};

export const logOutUser = async (userInfo) => {
  await instance.post("/users/logOut", userInfo);
};

export const refreshUser = async () => {
  const data = await instance.post("/users/refresh");
  return data;
};

export const getUserInfo = async () => {
  const data = await instance.get("/users/info");
  return data;
};

export const updateUserInfo = async (userInfo) => {
  const data = await instance.patch("/users/info", userInfo);
  return data;
};

export const updateUserPhoto = async (photo) => {
  const data = await instance.patch("/users/photo", photo);
  return data;
};
