import axios from "axios";

import authHeader from "./AuthHeader";
import { variables } from "../variables/variables";


const getEmployees = () => {
  return axios.get(variables.API_URL+"Employees", { headers: authHeader() });
};
const postEmployees = (data) => {
  return axios.post(variables.API_URL +"Employees", data, { headers: authHeader() });
};
const putEmployees = (id, data) => {
    return axios.put(variables.API_URL + "Employees/" + id, data, { headers: authHeader() });
};
const deleteEmployees = (id) => {
    return axios.delete(variables.API_URL +"Employees/" + id, { headers: authHeader() });
};
const UserService = {
  getEmployees,
  postEmployees,
  putEmployees,
  deleteEmployees,
};
export default UserService;