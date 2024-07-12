import { instance } from "../axios.js";

export const createWater = async (water) => {
  const data = await instance.post("/water", water);
  return data;
};

export const updateWater = async (id, water) => {
  const data = await instance.patch(`/water/${id}`, water);
  return data;
};

export const deleteWater = async (id) => {
  const data = await instance.delete(`/water/${id}`);
  return data;
};

export const getDayWater = async (date) => {
  const data = await instance.get(`/water/day`, { params: { date } });
  return data;
};

export const getMonthWater = async (date) => {
  const data = await instance.get(`/water/month`, { params: { date } });
  return data;
};
