import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Select,
  TextField,
  Typography,
  Stack,
  Pagination,
  Skeleton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { IGestor, IGestorDados, ISearchColaborators } from "../../utils/interfaces";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useManager } from "../../context/ManagerContext";

export const Dashboard: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<ISearchColaborators>();
  const navigate = useNavigate();
  const { nome, email } = watch();
  const { loading, pageDados, gestorDados, getManagers } = useManager();

  const handleSearch = (data: ISearchColaborators) => {
    console.log(data);
  };

  useEffect(() => {
    getManagers(0);
  }, []);

  useEffect(() => {
    console.log(gestorDados);
  }, [gestorDados]);

  const columns = [
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "cargo", headerName: "Cargo", width: 160 },
  ];

  return (
    <Stack
      direction={{
        xs: "column",
        lg: "row",
      }}
      spacing={3}
      component="main"
      maxWidth="lg"
      m="0 auto"
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxWidth: "400px",
        }}
        component="form"
        onSubmit={handleSubmit(handleSearch)}
      >
        <Typography variant="h6" component="h2">
          Buscar
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              id="dashboard-buscar-nome"
              {...register("nome")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              sx={{
                width: "100%",
              }}
              id="dashboard-buscar-email"
              {...register("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              native
              variant="outlined"
              sx={{ width: "100%" }}
              id="dashboard-buscar-cargo"
              {...register("tipoCargo")}
            >
              <option value="Administrador">Administrador</option>
              <option value="Colaborador">Colaborador</option>
            </Select>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          disabled={!nome && !email}
          sx={{
            width: {
              xs: "100%",
              md: "fit-content",
            },
            mt: 0.5,
          }}
          id="dashboard-buscar-buscar"
        >
          Buscar
        </Button>
      </Paper>

      <Box
        sx={{
          height: "470px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          gap: 2,
        }}
      >
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" animation="wave" height={400} />
          </Box>
        ) : (
          <DataGrid
            rows={gestorDados?.map((gestor: IGestorDados ) => {
              return {
                id: gestor.idGestor,
                nome: gestor.nome,
                email: gestor.email,
                cargo: gestor.cargoDto.nome.split("_")[1],
                tipoCargo: gestor.cargoDto.idCargo,
              };
            })}
            columns={columns}
            pageSize={10}
            hideFooterPagination
            onRowClick={(params) => {
              navigate(`/dashboard/edit-user`, {
                state: params.row,
              });
            }}
          />
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/new-user")}
            sx={{
              width: {
                xs: "100%",
                md: "fit-content",
              },
            }}
          >
            Novo usuário
          </Button>
          <Pagination
            count={pageDados?.totalPages}
            color="primary"
            size="small"
            onChange={(event, page) => getManagers(page - 1)}
          />
        </Box>
      </Box>
    </Stack>
  );
};
