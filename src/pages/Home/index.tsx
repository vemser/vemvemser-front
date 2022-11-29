import {
  Button,
  Grid,
  Container,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "../../utils/interfaces";
import { loginSchema } from "../../utils/schemas";
import { useEffect } from "react";
import { useManager } from "../../context/ManagerContext";
import logoDbc from "../../assets/logo-white.svg";

export const Home: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/dashboard");
  }, []);
  const navigate = useNavigate();

  const { handleUserlogin } = useManager();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    // resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: ILogin) => {
    handleUserlogin(data);
  };

  return (
    <Container
      maxWidth="lg"
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
          maxWidth="1000px"
          overflow="hidden"
          maxHeight={{
            xs: "100%",
            md: "400px",
          }}
          sx={{
            backgroundColor: "primary.light",
          }}
        >
          <Grid item xs={12} md={6}>
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
                onSubmit={handleSubmit(handleLogin)}
              >
                <TextField
                  id="home-email"
                  error={!!errors.email}
                  label="Email"
                  variant="filled"
                  helperText="Digite seu email"
                  {...register("email")}
                />
                <TextField
                  label="Senha"
                  type="password"
                  id="home-senha"
                  error={!!errors.senha}
                  variant="filled"
                  helperText="Digite sua senha"
                  {...register("senha")}
                />
                <Button
                  variant="contained"
                  color="primary"
                  id="home-entrar"
                  type="submit"
                >
                  Entrar
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
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
              className="home-background"
            >
              <Stack
                spacing={2}
                sx={{
                  backgroundColor: "rgba(47, 179, 255, 0.1)",
                }}
                p={2}
                borderRadius={3}
              >
                <img src={logoDbc} alt="Logo DBC" width="125" />
                <Typography variant="h6" component="p" color="white">
                  Ainda não se inscreveu no VemSer?
                </Typography>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  id="register"
                >
                  Inscreva-se aqui
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
