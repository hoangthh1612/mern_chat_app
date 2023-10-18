import { Dispatch, createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  isFetching: false,
  error: false,
  
};

type AuthState = {
    user: any,
    isFetching: boolean,
    error: boolean,
    dispatch: Dispatch<any>,
}

export const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthContextProvider = ({ children }: {children: any}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
