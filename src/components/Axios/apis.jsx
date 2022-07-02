import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
  baseURL: "https://rent-out.herokuapp.com",
});

let id =Cookies.get("Token")
API.interceptors.request.use((req) => {
  if (id) {
    req.headers["Authorization"] = `Bearer ${id}`;
  }
  return req;
});

export const Signin = (SigninData) => API.post("/auth/login", SigninData);

export const DashUsers = () =>
API.post(`/user/getUsers`,);
export const AllUsers = () =>
API.post(`/user/getAllUsers`,);



export const Signup = (SignupData) =>
  API.post("/api/client/onboard", SignupData);
export const Postinvoice = (data, id) =>
  API.post("/api/upload/invoice/sales", data, {
    headers: { "x-access-token": id },
  });
export const Editinvoice = (data, id) =>
  API.post("/api/invoice/sales/update", data, {
    headers: { "x-access-token": id },
  });
export const Singleinvoice = (salesId, id) =>
  API.get(`/api/invoice/single/get?invoiceId=${salesId}`, {
    headers: { "x-access-token": id },
  });
export const Uploadsale = (file, id) =>
  API.post("/api/upload/invoice/file", file, {
    headers: { "x-access-token": id },
  });
export const Workstatus = (id, page) =>
  API.get(`/api/invoices?page=${page}`, { headers: { "x-access-token": id } });
export const AllWork = (id) =>
  API.get(`/api/invoices/getAll`, { headers: { "x-access-token": id } });
export const WorkDownload = (id) =>
  API.get("/api/invoice/sales/excel", {
    responseType: "blob",
    headers: { "x-access-token": id },
  });
  export const SalesDownload = (id) =>
  API.get("/api/invoices/excel?invoiceType=Sales", {
    responseType: "blob",
    headers: { "x-access-token": id },
  });
export const WorkFilter = (data, id) =>
  API.post("/api/invoices/filter?invoiceType=Sales", data, {
    headers: { "x-access-token": id },
  });
  export const SalesFilter = (data, id) =>
  API.post("/api/invoice/sales/filter", data, {
    headers: { "x-access-token": id },
  });
  export const AllSales = (id) =>
  API.get(`/api/invoices/sales/getAll`, { headers: { "x-access-token": id } });
export const Salestatus = (id,page) =>
  API.get(`/api/invoices/sales?page=${page}`, {
    headers: { "x-access-token": id },
  });

  // // AdminSide
 
  // export const AllUsers = (id) =>
  // API.get(`/all/users`, {
  //   headers: { "x-access-token": id },
  // });

  // export const AllCA = (id) =>
  // API.get(`/ca/list `, {
  //   headers: { "x-access-token": id },
  // });