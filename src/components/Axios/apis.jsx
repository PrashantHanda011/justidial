import axios from "axios";
import Cookies from "js-cookie";
let token = JSON.parse(localStorage.getItem('RentOutToken'))
const API = axios.create({
  baseURL: "https://stalo.herokuapp.com",
  headers:{
    Authorization:`Bearer ${token}`
  }
});


export const Signin = (SigninData) => API.post("/auth/admin-login",SigninData);

export const DashUsers = () => API.get(`/admin/dashboard`);
export const company = () => API.get(`/admin/getAllCompanies`);
export const PostCompany = (data) => API.post(`/company/addCompany`,data);
export const Fetchfeedback = () => API.get(`/fd/getAllFeedbacks`);


// notification

export const NotificationSend = (data) => API.post(`/admin/sendPushNotification`,data);



// getuser
export const Users = () => API.get(`/admin/getAllUsers`);
export const UpdateUsers = (data) => API.post(`admin/updateUser`,data);

// popup
export const popups = (popup) => API.post(`/ad/addPopupAd`, popup);
export const Deletepopups = (data) => API.post(`ad/deletePopupAd`, data);
export const Getpopups = () => API.get(`/ad/getPopupAd`) ;

// top
export const Topads = (data) => API.post(`/ad/addTopAd`, data);
export const GetTop = () => API.get(`/ad/getTopAd`) ;
export const Deletetopads = (data) => API.post(`/ad/deleteTopAd`, data);


//bottom
export const Bottomads = (data) => API.post(`/ad/addBottomAd`, data);
export const GetBottom = () => API.get(`/ad/getBottomAd`) ;
export const DeleteBottomads = (data) => API.post(`/ad/deleteBottomAd`, data);

//category
export const Categoryads = (data) => API.post(`/ad/addCategoryAd`, data);
export const GetCategory = () => API.get(`/ad/getCategoryAd`) ;
export const DeleteCategoryads = (data) => API.post(`/ad/deleteCategoryAd`, data);
export const GetallCategory = () => API.get(`/category/getAllCategories`);
export const GetallCategoryByID = (data) => API.post(`/company/getCompanyByCategory`,data);




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
