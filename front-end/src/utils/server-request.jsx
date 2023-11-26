import axios from "axios";
import { API_URL } from "../config/constants";
import { toast } from "react-toastify";

const HEADERS = {
  "Content-Type": "application/json",
};

const serverRequestPost = async (endPoint, params = {}, success = () => {}) => {
  await axios
    .post(`${API_URL}/${endPoint}`, params, { headers: HEADERS })
    .then((res) => success(res.data))
    .catch((err) => {
      const { data } = err.response;
      toast.error(data?.message);
      console.log(`serverRequestPost Error : ${API_URL}/${endPoint}`, err);
    });
};

const serverRequestGet = async (endPoint, success = () => {}) => {
  await axios
    .get(`${API_URL}/${endPoint}`)
    .then((res) => success(res.data))
    .catch((err) => {
      const { data } = err.response;
      toast.error(data?.message);
      console.log(`serverRequestGet Error : ${API_URL}/${endPoint}`, err);
    });
};

export { serverRequestPost, serverRequestGet };
