import { useState, createContext, useContext } from "react";
import { ICandidateContext, IChildren } from "../utils/interfaces";

export const CandidatesContext = createContext({} as ICandidateContext);

export const CandidatesProvider = ({ children }: IChildren) => {
  const [data, setData] = useState({});

  const setFormValues = (values: object) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <CandidatesContext.Provider value={{ setFormValues, data }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidatesContext);
