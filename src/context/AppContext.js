import { createContext, useEffect, useState } from "react";
import { api } from "../api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    api.getUsers().then(setUsers);
    api.getGroups().then(setGroups);
  }, []);

  return (
    <AppContext.Provider value={{ users, groups }}>
      {children}
    </AppContext.Provider>
  );
};
