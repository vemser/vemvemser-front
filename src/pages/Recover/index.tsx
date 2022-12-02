import {
  Button,
  Grid,
  Container,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverSchema } from "../../utils/schemas";
import { IRecover } from "../../utils/interfaces";

export const Recover = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecover>({
    resolver: yupResolver(recoverSchema),
  });

  const handleRecover = (data: IRecover) => {
    console.log(data);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        p: {
          xs: 0,
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        p={{
          xs: 0,
          sm: 2,
          md: 3,
          lg: 4,
        }}
      >
        <Grid
          container
          borderRadius={{
            xs: 0,
            sm: 3,
          }}
          height="100%"
          overflow="hidden"
          maxHeight={{
            xs: "100%",
            md: "330px",
          }}
          sx={{
            backgroundColor: "primary.light",
          }}
        >
          <Grid item xs={12}>
            <Box
              p={{
                xs: 2,
                sm: 3,
                md: 4,
                lg: 5,
              }}
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Stack
                spacing={2}
                component="form"
                id="login"
                onSubmit={handleSubmit(handleRecover)}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    id="home-email"
                    error={!!errors.senha}
                    label="Senha"
                    type="password"
                    variant="filled"
                    {...register("senha")}
                  />
                  {
                    <Typography variant="caption" color="error">
                      {errors.senha?.message}
                    </Typography>
                  }
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    label="Confirmar senha"
                    type="password"
                    id="home-senha"
                    error={!!errors.confirmarSenha}
                    variant="filled"
                    {...register("confirmarSenha")}
                  />
                  {
                    <Typography variant="caption" color="error">
                      {errors.confirmarSenha?.message}
                    </Typography>
                  }
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  id="home-entrar"
                  type="submit"
                >
                  Recuperar
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
