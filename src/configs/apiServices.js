import axios from "../../axios";

export const createCourses = async () => {
  try {
    const response = await axios.get("/api/create-new-courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};
export const updateCourses = async () => {
  try {
    const response = await axios.get("/api/delete-courses");
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};
export const deleteCourses = async () => {
  try {
    const response = await axios.get("/api/edit-courses");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllCourses = async () => {
  try {
    const response = await axios.get("/api/get-all-courses");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getDetailCoursesById = async () => {
  try {
    const response = await axios.get("/api/get-detail-courses-by-id");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
