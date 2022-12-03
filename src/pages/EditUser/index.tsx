import {
  Stack,
  Grid,
  TextField,
  Typography,
  Button,
  FormLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Radio } from "../../utils/theme";
import { useForm } from "react-hook-form";
import { IGestor } from "../../utils/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { userEditSchema } from "../../utils/schemas";
import { useLocation, useNavigate } from "react-router-dom";
import { useManager } from "../../context/ManagerContext";
import { useEffect, useState } from "react";

export const EditUser: React.FC = () => {
  const { state } = useLocation();
  const { gestorLogado, deleteManager, editManager } = useManager();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
  } = useForm<IGestor>({
    resolver: yupResolver(userEditSchema),
    defaultValues: {
      nome: state?.nome,
      email: state?.email,
      tipoCargo: state?.tipoCargo.toString(),
    },
  });

  const handleEditUser = (data: IGestor) => {
    editManager(state?.id, {
      nome: data?.nome,
      email: data?.email,
      tipoCargo: data?.tipoCargo,
    });
  };

  useEffect(() => {
    if (gestorLogado?.cargoDto?.idCargo !== 1) {
      navigate("/dashboard");
    }
  }, [gestorLogado]);

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
          onSubmit={handleSubmit(handleEditUser)}
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
          {gestorLogado?.cargoDto?.idCargo === 1 && (
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
                    value={2}
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
          )}
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
              {gestorLogado?.cargoDto?.idCargo === 1 && (
                <Button
                  variant="contained"
                  color="secondary"
                  id="editar-usuario-exccluir"
                  sx={{
                    width: { xs: "100%", sm: "fit-content" },
                  }}
                  onClick={handleClickOpen}
                >
                  Excluir usuário
                </Button>
              )}
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
