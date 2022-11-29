import {
  Stack,
  Grid,
  TextField,
  Typography,
  Button,
  FormLabel,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Radio } from "../../utils/theme";
import { useForm } from "react-hook-form";
import { IUser } from "../../utils/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../utils/schemas";
import { useLocation } from "react-router-dom";
import { useManager } from "../../context/ManagerContext";
import { useState } from "react";

export const EditUser: React.FC = () => {
  const { state } = useLocation();
  const { deleteManager } = useManager();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(userSchema),
    defaultValues: state,
  });

  const handleAddNewUser = (data: IUser) => {
    data = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipoCargo: data.tipoCargo,
    };
    console.log(data);
  };

  return (
    <Stack maxWidth="lg" m="0 auto">
      <Grid container>
        <Grid
          component="form"
          container
          spacing={2}
          alignItems="center"
          alignContent="center"
          id="editar-usuario"
          onSubmit={handleSubmit(handleAddNewUser)}
        >
          <Grid item xs={12} md={6} component="form">
            <TextField
              label="Nome completo"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              id="editar-usuario-nome"
              error={!!errors.nome}
              {...register("nome")}
            />
            <Typography variant="caption" color="error">
              {errors.nome?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} component="form">
            <TextField
              label="Email"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              id="editar-usuario-email"
              error={!!errors.email}
              {...register("email")}
            />
            <Typography variant="caption" color="error">
              {errors.email?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} component="form">
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
                id="editar-usuario-senha"
                error={!!errors.senha}
                {...register("senha")}
              />
            </Tooltip>
            <Typography variant="caption" color="error">
              {errors.senha?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} component="form">
            <TextField
              label="Confirme a senha"
              variant="outlined"
              type="password"
              sx={{
                width: "100%",
              }}
              id="editar-usuario-confirmar-senha"
              error={!!errors.confirmarSenha}
              {...register("confirmarSenha")}
            />
            <Typography variant="caption" color="error">
              {errors.confirmarSenha?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel component="legend" sx={{ mb: 1, ml: 1 }}>
              Qual cargo o usuário irá exercer?
            </FormLabel>
            <Stack direction="row" spacing={2}>
              <FormLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Radio
                  type="radio"
                  value={0}
                  id="editar-usuario-colaborador"
                  {...register("tipoCargo")}
                />
                Colaborador
              </FormLabel>
              <FormLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Radio
                  type="radio"
                  value={1}
                  id="editar-usuario-administrador"
                  {...register("tipoCargo")}
                />
                Administrador
              </FormLabel>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                type="submit"
                variant="contained"
                id="editar-usuario-editar"
                sx={{
                  width: { xs: "100%", sm: "fit-content" },
                }}
              >
                confirmar edição
              </Button>
              <Button
                variant="contained"
                color="error"
                id="editar-usuario-exccluir"
                sx={{
                  width: { xs: "100%", sm: "fit-content" },
                }}
                onClick={handleClickOpen}
              >
                Excluir usuário
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-excluir-usuario"
                aria-describedby="alert-excluir-usuario-descricao"
                maxWidth="xs"
              >
                <DialogTitle id="alert-excluir-usuario">
                  Deseja realmente excluir o usuário?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-excluir-usuario-descricao">
                    Ao excluir o usuário, todos os dados relacionados a ele
                    serão excluídos permanentemente.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={handleClose}>
                    Não excluir
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleClose();
                      deleteManager(state.id);
                    }}
                    autoFocus
                  >
                    Excluir
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
