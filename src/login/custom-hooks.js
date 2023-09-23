import {useApolloClient} from "@apollo/client";
import {useState} from "react";

export const useUser = () => {

  const [token, setToken] = useState(() => localStorage.getItem('user-token'));
  const client = useApolloClient();

  const logout = (setToken) => {
    setToken(null);
    localStorage.clear();
    client.resetStore(); //limpiar el apollo cache
  }

  return {token, setToken, logout};
};
