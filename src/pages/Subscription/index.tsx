import { Stack, Grid, TextField, Box, Button, Pagination, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { useCandidates } from "../../context/CandidatesContext";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { ISearchByEmail } from "../../utils/interfaces";

const columns = [
  { field: "avaliado", headerName: "Status", minWidth: 160, flex: 1 },
  { field: "nome", headerName: "Nome", minWidth: 160, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 160, flex: 1 },
  { field: "telefone", headerName: "Telefone", width: 150 },
  { field: "dataNascimento", headerName: "Data de Nascimento", width: 130 },
  { field: "turno", headerName: "Turno", width: 140 },
  { field: "estado", headerName: "Estado", width: 140 },
];


export const Subscription = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    getCandidates,
    getCandidateByEmail,
    candidates,
    searcheredCandidates,
  } = useCandidates();
  const { register, handleSubmit } = useForm<ISearchByEmail>();

  useEffect(() => {
    getCandidates(0);
  }, []);

  const handleSearch = (data: ISearchByEmail) => {
    getCandidateByEmail(data.email);
  };

  const rows = () => {
    if (searcheredCandidates.length > 0) {
      return searcheredCandidates?.map((candidato) => {
        return {
          id: candidato.idInscricao,
          avaliado: candidato.avaliado === "T" ? "Avaliado" : "Não avaliado",
          nome: candidato.candidato.nome,
          email: candidato.candidato.email,
          telefone: candidato.candidato.telefone,
          dataNascimento: candidato.candidato.dataNascimento,
          turno: candidato.candidato.formulario.turno,
          estado: candidato.candidato.estado,
        };
      });
    } else
      return candidates?.elementos?.map((candidato) => {
        return {
          id: candidato.idInscricao,
          avaliado: candidato.avaliado === "T" ? "Avaliado" : "Não Avaliado",
          nome: candidato.candidato.nome,
          email: candidato.candidato.email,
          telefone: candidato.candidato.telefone,
          dataNascimento: candidato.candidato.dataNascimento,
          turno: candidato.candidato.formulario.turno,
          estado: candidato.candidato.estado,
        };
      });
  };

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
        <Grid
          item
          xs={12}
          component="form"
          onSubmit={handleSubmit(handleSearch)}
        >
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ width: "100%" }}
              label="Pesquisar por email"
              id="registros-pesquisar"
              {...register("email")}
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
            <Button variant="contained" color="primary" type="submit">
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
            {candidates.elementos ? (
              <DataGrid
                rows={rows()}
                columns={columns}
                pageSize={20}
                hideFooterPagination
                onRowClick={(params) => {
                  navigate("/subscriptions/curriculum", {
                    state: { id: params.row.id },
                  });
                }}
              />
            ) : <Skeleton variant="rectangular" animation="wave" height={400} />}

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
              {!searcheredCandidates.length && (
                <Pagination
                  count={candidates?.quantidadePaginas}
                  color="primary"
                  size="small"
                  onChange={(event, page) => {
                    getCandidates(page - 1);
                  }}
                />
              )}

              {searcheredCandidates.length > 0 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    getCandidateByEmail("");
                  }}
                >
                  Limpar busca
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};
