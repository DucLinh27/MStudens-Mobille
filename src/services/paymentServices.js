import axios from "axios";

const getConfig = async () => {
  const res = await axios.get(`${BASE_URL}/payment/config`);
  return res.data;
};
export { getConfig };
