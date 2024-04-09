import axios from "axios";

const createOrderService = (data) => {
  return axios.post(`http://10.25.90.103:8080/api/create-order`, data);
};
const postStudentOrderCourses = (data) => {
  return axios.post(`http://10.25.90.103:8080/api/student-order-courses`, data);
};
export { createOrderService, postStudentOrderCourses };
