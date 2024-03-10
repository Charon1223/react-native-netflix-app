import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "a95a9d8cadc957b6a24a3b89a670a913",
    language: "ko-KR",
  },
});

export default axiosInstance;
