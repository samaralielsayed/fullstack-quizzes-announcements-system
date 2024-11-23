import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://quizzes-announcements-system.vercel.app/api/v1",
});

export default axiosInstance;
