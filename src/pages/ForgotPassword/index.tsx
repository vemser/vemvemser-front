import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const tokenRecuperarSenha = search.split("=")[1];

  useEffect(() => {
    if (tokenRecuperarSenha) {
      localStorage.setItem("token", tokenRecuperarSenha);
      navigate("/recover-password/");
    }
  }, [tokenRecuperarSenha]);
  return <div>ForgotPassword</div>;
};
