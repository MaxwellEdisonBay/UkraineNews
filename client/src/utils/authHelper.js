import { API_URL } from "../App";

export const googleLogin = () => {
  window.open(API_URL + "/auth/google", "_self");
};

export const googleLogout = (dispatch) => {
  window.open(API_URL + "/auth/logout", "_self");
};
