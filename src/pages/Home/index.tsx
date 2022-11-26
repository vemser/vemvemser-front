import {
  Button,
  Grid,
  Container,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import logoDbc from "../../assets/logo-white.svg";

export const Home = () => {
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
              <Stack spacing={2} component="form" id="login">
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  variant="filled"
                  helperText="Digite seu email"
                />
                <TextField
                  label="Senha"
                  type="password"
                  id="password"
                  variant="filled"
                  helperText="Digite sua senha"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  id="btn-login"
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
                  Ainda não se inscrveu no VemSer?
                </Typography>
                <Button
                  component={Link}
                  to="/"
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
