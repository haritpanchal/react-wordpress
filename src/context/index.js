import React, { createContext, useState } from "react";

// export const Context = createContext('Default Value');
export const Context = createContext();

export default function ContextProvider(props) {
  const [proileBadge, setProileBadge] = useState("A A");

  const changeProdileBadge = (newProileBadge) => {
    setProileBadge(newProileBadge);
  };

  return (
    <Context.Provider value={{ proileBadge, changeProdileBadge }}>
      {props.children}
    </Context.Provider>
  );
}
