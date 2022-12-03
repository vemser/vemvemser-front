import React, { useEffect } from "react";
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
import { userEditSchema } from "../../utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const { loggedManager, editManager, gestorLogado } = useManager();
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
  } = useForm<IGestorDados>({
    resolver: yupResolver(userEditSchema),
    defaultValues: {
      nome: gestorLogado?.nome,
      email: gestorLogado?.email,
    },
  });

  const handleEditUser = (data: IGestorDados) => {
    editManager(gestorLogado.idGestor, {
      nome: data?.nome,
      email: data?.email,
      tipoCargo: gestorLogado?.cargoDto?.idCargo,
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
            id="novo-usuario"
            onSubmit={handleSubmit(handleEditUser)}
          >
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome completo"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                id="novo-usuario-nome"
                error={!!errors.nome}
                {...register("nome")}
              />
              <Typography variant="caption" color="error">
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
                id="novo-usuario-email"
                error={!!errors.email}
                {...register("email")}
              />
              <Typography variant="caption" color="error">
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
                  sx={{
                    width: "100%",
                  }}
                  id="novo-usuario-senha"
                />
              </Tooltip>
              <Typography variant="caption" color="error">
                {/* {errors.senha?.message} */}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirme a senha"
                variant="outlined"
                type="password"
                sx={{
                  width: "100%",
                }}
                id="novo-usuario-confirmar-senha"
              />
              <Typography variant="caption" color="error">
                {/* {errors.confirmarSenha?.message} */}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {gestorLogado.idGestor && (
                <Button
                  type="submit"
                  variant="contained"
                  id="novo-usuario-cadastrar"
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
