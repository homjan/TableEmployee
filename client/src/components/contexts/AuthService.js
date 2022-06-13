import axios from "axios";
import { variables } from "../variables/variables";

const login = (username, password) => {

  let formData = new FormData();    

  formData.append("username", username);   
  formData.append("password", password);
  
  const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }

  return axios
    .post(variables.API_WITHOUT_URL+ "login", formData, config)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("authData", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("authData");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("authData"));
};
const AuthService = {  
  login,
  logout,
  getCurrentUser,
};
export default AuthService;