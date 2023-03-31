import axios from "axios";
import { NotificationManager } from "react-notifications";

const restApi = "https://beertech-production.up.railway.app";
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
export const loginUserMutation = async (userDetails) => {
  try {
    const response = await axios.post(`${restApi}/v1/auth/login`, userDetails);

    const data = await response;
    return data.data;
  } catch (error) {
    NotificationManager.error("An error occurred", "Error");
  }
};

export const updateUserMutation = async (code) => {
  const response = await axios.get(
    `${restApi}/v1/user/read_qrcode?code=${code}`,
    config
  );
  return response.data;
};

// export const getUserQuery = async (id) => {
//   const { data } = await axios.get(`${restApi}/v1/user/${id}`, config);
//   return data;
// };
