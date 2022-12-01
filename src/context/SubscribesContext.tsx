import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";
import axios from "axios";
import { IChildren } from "../utils/interfaces";

interface ISubscribesContext {}

export const ManagerContext = createContext({} as ISubscribesContext);

export const ManagerProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const getSubscribes = async () => {
    nProgress.start();
    try {
    } catch (error) {
    } finally {
      nProgress.done();
    }
  };
  return (
    <ManagerContext.Provider value={{}}>{children}</ManagerContext.Provider>
  );
};

export const useManager = () => useContext(ManagerContext);
