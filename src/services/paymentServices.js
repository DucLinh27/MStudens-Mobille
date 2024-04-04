import axios from "axios";

const getConfig = async () => {
  const res = await axios.get(`http://192.168.1.178:8080/payment/config`);
  return res.data;
};
export { getConfig };
