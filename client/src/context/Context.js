import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
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
        .get("http://localhost:5000/auth/login/success", {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        })
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
