import React, { useEffect, useState } from "react";
import {
  Stack,
  Grid,
  TextField,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { useManager } from "../../context/ManagerContext";
import { IGestorDados } from "../../utils/interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { recoverSchema, userEditSchema } from "../../utils/schemas";

export const userEditSchemaWithoutPassword = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .matches(
      /^[\w-.]+@dbccompany.com.br$/,
      "Só é válido o email com @dbccompany.com.br"
    ),
});

export const userEditSchemaWithPassword = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .matches(
      /^[\w-.]+@dbccompany.com.br$/,
      "Só é válido o email com @dbccompany.com.br"
    ),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(/^(?=.*[A-Z])/, "A senha deve ter no mínimo 1 letra maiúscula")
    .matches(/^(?=.*[a-z])/, "A senha deve ter no mínimo 1 letra minúscula")
    .matches(/^(?=.*[0-9])/, "A senha deve ter no mínimo 1 número")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "A senha deve ter no mínimo 1 caracter especial"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
});

export interface IPerfil {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha?: string;
}

export const Perfil = () => {
  const { loggedManager, editManager, gestorLogado } = useManager();
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loggedManager();
  }, []);

  window.addEventListener("load", () => {
    navigate("/dashboard");
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerfil>({
    resolver: yupResolver(senha.length >= 1 ? recoverSchema : userEditSchema),
    defaultValues: {
      nome: gestorLogado?.nome,
      email: gestorLogado?.email,
    },
  });

  const handleEditUser = (data: IPerfil) => {
    console.log(data);
    editManager(gestorLogado.idGestor, {
      nome: data?.nome,
      email: data?.email,
      tipoCargo: gestorLogado?.cargoDto?.idCargo,
      senha: data?.senha,
    });
  };

  return (
    <Stack maxWidth="lg" m="0 auto">
      <Grid container>
        {gestorLogado && (
          <Grid
            component="form"
            container
            spacing={2}
            alignItems="center"
            alignContent="center"
            id="perfil-editar-form"
            onSubmit={handleSubmit(handleEditUser)}
          >
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome completo"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                id="perfil-nome"
                error={!!errors.nome}
                {...register("nome")}
              />
              <Typography id="perfil-nome-erro" variant="caption" color="error">
                {errors.nome?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                id="perfil-email"
                error={!!errors.email}
                {...register("email")}
              />
              <Typography id="perfil-email-erro" variant="caption" color="error">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip
                title="A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caracter especial"
                placement="bottom-end"
                arrow
              >
                <TextField
                  label="Senha"
                  variant="outlined"
                  type="password"
                  error={!!errors.senha}
                  {...register("senha")}
                  onChange={(e) => setSenha(e.target.value)}
                  sx={{
                    width: "100%",
                  }}
                  id="perfil-senha"
                />
              </Tooltip>
              <Typography variant="caption" color="error">
                {errors.senha?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirme a senha"
                variant="outlined"
                type="password"
                {...register("confirmarSenha")}
                sx={{
                  width: "100%",
                }}
                id="perfil-confirmar-senha"
              />
              <Typography variant="caption" color="error">
                {errors.confirmarSenha?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {gestorLogado.idGestor && (
                <Button
                  type="submit"
                  variant="contained"
                  id="perfil-editar-btn"
                >
                  Editar
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};
