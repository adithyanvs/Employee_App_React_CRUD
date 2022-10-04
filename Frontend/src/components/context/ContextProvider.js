import React, { createContext, useState } from "react";

export const adddata = createContext("");
export const updatedata = createContext("");
export const deldata = createContext("");

const ContextProvider = ({ children }) => {
  const [udata, setUdata] = useState("");
  const [updata, setUpdata] = useState("");
  const [dltdata, setDltdata] = useState("");

  return (
    <adddata.Provider value={{ udata, setUdata }}>
      <updatedata.Provider value={{ updata, setUpdata }}>
        <deldata.Provider value={{dltdata, setDltdata}} >{children}</deldata.Provider>
      </updatedata.Provider>
    </adddata.Provider>
  );
};

export default ContextProvider;
