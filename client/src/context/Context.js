import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { API_URL } from "../App";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: "LOGIN_START" });
    const getUser = () => {
      axios
        .get(API_URL + "/auth/login/success")
        .then((res) => {
          if (res.status === 200) return res.data;
          dispatch({ type: "LOGIN_FAILURE" });
          throw new Error("Authentication has been failed");
        })
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.user });
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_FAILURE" });
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
