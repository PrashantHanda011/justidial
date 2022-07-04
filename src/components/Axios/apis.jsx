import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
  baseURL: "https://rent-out.herokuapp.com",
});

let id = Cookies.get("Token");
API.interceptors.request.use((req) => {
  if (id) {
    req.headers["Authorization"] = `Bearer ${id}`;
  }
  return req;
});

export const Signin = (SigninData) => API.post("/auth/login", SigninData);

export const DashUsers = (data) => API.post(`/user/getUsers`, data);
export const AllUsers = (data) => API.post(`/user/getAllUsers`, data);
export const UserAd = (data) => API.post(`/ads/getUsersAllAds`, data);
export const FetchSearch = (data) => API.post(`/user/getUserSearch`, data);
export const FetchRevenue = (data) => API.post(`/payment/getRevenues`, data);
export const FetchGraph = (data) => API.get(`/payment/getSales`, data);
export const FetchPlans = () => API.get(`/payment/getPlans`);
export const UpdatePlans = (data) => API.post(`/payment/updatePlans`, data);
