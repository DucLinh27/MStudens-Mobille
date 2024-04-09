import axios from "axios";

const getConfig = async () => {
  const res = await axios.get(`http://10.25.90.103:8080/payment/config`);
  return res.data;
};
export { getConfig };
