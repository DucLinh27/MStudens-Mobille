import axios from "axios";

const createOrderService = (data) => {
  return axios.post("http://192.168.1.178:8080/api/create-order", data);
};
const postStudentOrderCourses = (data) => {
  return axios.post(
    "http://192.168.1.178:8080/api/student-order-courses",
    data
  );
};
export { createOrderService, postStudentOrderCourses };
