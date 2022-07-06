import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
  baseURL: "https://rent-out.herokuapp.com",
});

// let id = Cookies.get("RentOutToken");
// API.interceptors.request.use((req) => {
//   if (id) {
//     req.headers["Authorization"] = `Bearer ${id}`;
//   }
//   return req;
// });

export const Signin = (SigninData) => API.post("/admin/adminLogin", SigninData);

export const DashUsers = (data) => API.post(`/admin/getUsers`, data);
export const AllUsers = (data) => API.post(`/admin/getAllUsers`, data);
export const UserAd = (data) => API.post(`/admin/getUsersAllAds`, data);
export const FetchSearch = (data) => API.post(`/admin/getUserSearch`, data);
export const FetchRevenue = (data) => API.post(`/payment/getRevenues`, data);
export const FetchGraph = (data) => API.get(`/payment/getSales`, data);
export const FetchPlans = () => API.get(`/payment/getPlans`);
export const UpdatePlans = (data) => API.post(`/payment/updatePlans`, data);

export const FetchsubAdmin = () => API.get(`/admin/getAdmins`);
export const AddsubAdmin = (data) => API.post(`/admin/addAdmin`, data);
export const EditsubAdmin = (data) => API.post(`/admin/editAdmin`, data);
export const DeletesubAdmin = (data) => API.post(`/admin/deleteAdmin`, data);
