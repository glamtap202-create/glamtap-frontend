import API from "./axios";

export const getServices = () => API.get("/services");

export const getSingleService = (id) =>
  API.get(`/services/${id}`);

export const searchServices = (keyword) =>
  API.get(`/services/search?keyword=${keyword}`);