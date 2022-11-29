import {
  Stack,
  Grid,
  TextField,
  Typography,
  Button,
  FormLabel,
  Tooltip,
} from "@mui/material";
import { Radio } from "../../utils/theme";
import { useForm } from "react-hook-form";
import { IUser } from "../../utils/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../utils/schemas";
import { useManager } from "../../context/ManagerContext";

export const NewUser: React.FC = () => {
  const { createNewManager } = useManager();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      tipoCargo: 2,
    },
  });

  const handleAddNewUser = (data: IUser) => {
    data = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipoCargo: data.tipoCargo,
    };
    createNewManager(data);
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
          id="novo-usuario"
          onSubmit={handleSubmit(handleAddNewUser)}
        >
          <Grid item xs={12} md={6} component="form">
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
          <Grid item xs={12} md={6} component="form">
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
                id="novo-usuario-senha"
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
              id="novo-usuario-confirmar-senha"
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
                  value={2}
                  id="novo-usuario-colaborador"
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
                  defaultChecked
                  id="novo-usuario-administrador"
                  {...register("tipoCargo")}
                />
                Administrador
              </FormLabel>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              id="novo-usuario-cadastrar"
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
