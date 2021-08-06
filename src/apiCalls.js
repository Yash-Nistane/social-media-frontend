import axios from "./helpers/axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const signUpCall = async (userCredential, dispatch) => {
  dispatch({ type: "SIGNUP_START" });
  try {
    const res = await axios.post("/auth/register", userCredential);
    console.log(res.data);
    dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "SIGNUP_FAILURE", payload: err });
  }
};

export const updateOnlineUsers = (usersOnline,dispatch) => {
  dispatch({type:"UPDATE_ONLINE_USERS", payload:usersOnline});
}
