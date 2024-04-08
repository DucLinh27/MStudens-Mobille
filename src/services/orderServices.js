import axios from "axios";

const createOrderService = (data) => {
  return axios.post(`${BASE_URL}/api/create-order`, data);
};
const postStudentOrderCourses = (data) => {
  return axios.post(`${BASE_URL}/api/student-order-courses`, data);
};
export { createOrderService, postStudentOrderCourses };
