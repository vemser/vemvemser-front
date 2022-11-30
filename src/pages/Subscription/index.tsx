import { Stack, Grid, TextField, Box, Button, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MagnifyingGlass } from "phosphor-react";

const columns = [
  { field: "avaliado", headerName: "Avaliado", width: 80 },
  { field: "nome", headerName: "Nome", minWidth: 160, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 160, flex: 1 },
  { field: "telefone", headerName: "Telefone", width: 150 },
  { field: "genero", headerName: "Gênero", width: 120 },
  { field: "estado", headerName: "Estado", width: 140 },
  { field: "dataInscricao", headerName: "Data de Inscrição", width: 130 },
];

const rows = [
  {
    id: 1,
    avaliado: "F",
    nome: "João",
    email: "teste@gmail.com",
    telefone: "19987657829",
    genero: "Feminino",
    estado: "Porto Alegre",
    dataInscricao: "2022-11-29",
  },
];

export const Subscription = () => {
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
      <Grid container spacing={2}>
        <Grid item xs={12} component="form">
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ width: "100%" }}
              label="Pesquisar por nome"
              id="registros-pesquisar"
              InputProps={{
                startAdornment: (
                  <Box display="flex" alignItems="center" mr={1}>
                    <MagnifyingGlass
                      size={20}
                      color="var(--primary)"
                      weight="bold"
                    />
                  </Box>
                ),
              }}
            />
            <Button variant="contained" color="primary">
              Buscar
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              height: "calc(100vh - 190px)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              gap: 2,
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              hideFooterPagination
              onRowClick={(params) => {}}
            />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: {
                  xs: "column-reverse",
                  md: "row",
                },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination count={20} color="primary" size="small" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};
