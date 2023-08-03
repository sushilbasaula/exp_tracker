import axios from "axios";
const baseURL = "http://localhost:8000/api/v1";
const userAPI = baseURL + "/user";
const transAPI = baseURL + "/transaction";

// ======== user api
export const postUser = async (obj) => {
  try {
    const { data } = await axios.post(userAPI, obj);
    return data;
  } catch (error) {
    return {
      status: "success",
      message: error.message,
    };
  }
};

// ======== transaction api
