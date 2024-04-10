import axios from "axios";

const handleLoginApi = (email, password) => {
  return axios.post("http://192.168.1.180:8080/api/login", { email, password });
};
const createRegisterUserServices = (data) => {
  return axios.post("http://192.168.1.180:8080/api/registerNewUser", data);
};
export { createRegisterUserServices, handleLoginApi };
