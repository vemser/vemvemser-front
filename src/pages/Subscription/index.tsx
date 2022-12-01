import { Stack, Grid, TextField, Box, Button, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect } from "react";
import { useCandidates } from "../../context/CandidatesContext";
import { ICandidatosDados, ITrilhas } from "../../utils/interfaces";
import { useForm } from "react-hook-form";

const columns = [
  { field: "nome", headerName: "Nome", minWidth: 160, flex: 1 },
  { field: "email", headerName: "Email", minWidth: 160, flex: 1 },
  { field: "telefone", headerName: "Telefone", width: 150 },
  { field: "dataNascimento", headerName: "Data de Nascimento", width: 130 },
  { field: "trilhas", headerName: "Trilhas", width: 120 },
  { field: "turno", headerName: "Turno", width: 140 },
  { field: "estado", headerName: "Estado", width: 140 },
];

interface ISearchCandidateByEmail {
  email: string;
}

export const Subscription = () => {
  const {
    getCandidates,
    getCandidateByEmail,
    candidates,
    searcheredCandidates,
  } = useCandidates();
  const { register, handleSubmit } = useForm<ISearchCandidateByEmail>();

  useEffect(() => {
    getCandidates(0);
  }, []);

  useEffect(() => {
    console.log(candidates?.elementos);
  }, [candidates]);

  useEffect(() => {
    console.log(searcheredCandidates);
  }, [searcheredCandidates]);

  const rows = () => {
    if (searcheredCandidates.idCandidato > 1) {
      return [
        {
          id: searcheredCandidates.idCandidato,
          nome: searcheredCandidates.nome,
          email: searcheredCandidates.email,
          telefone: searcheredCandidates.telefone,
          dataNascimento: searcheredCandidates.dataNascimento,
          trilhas: searcheredCandidates.formulario.trilhas.map(
            (trilha: ITrilhas) => {
              return trilha.nome;
            }
          ),
          turno: searcheredCandidates.formulario.turno,
          estado: searcheredCandidates.estado,
        },
      ];
    } else {
      return candidates?.elementos?.map((candidato) => {
        return {
          id: candidato.idCandidato,
          nome: candidato.nome,
          email: candidato.email,
          telefone: candidato.telefone,
          dataNascimento: candidato.dataNascimento,
          trilhas: candidato.formulario.trilhas.map((trilha: ITrilhas) => {
            return trilha.nome;
          }),
          turno: candidato.formulario.turno,
          estado: candidato.estado,
          rest: {
            ...candidato,
          },
        };
      });
    }
  };

  const handleSearch = (data: ISearchCandidateByEmail) => {
    getCandidateByEmail(data.email);
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
            {candidates.elementos && (
              <DataGrid
                rows={rows()}
                columns={columns}
                pageSize={10}
                hideFooterPagination
                onRowClick={(params) => {
                  console.log(params.row);
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Pagination
                count={candidates?.quantidadePaginas}
                color="primary"
                size="small"
                onChange={(event, page) => {
                  getCandidates(page - 1);
                }}
              /> */}
              {!searcheredCandidates.idCandidato && (
                <Pagination
                  count={candidates?.quantidadePaginas}
                  color="primary"
                  size="small"
                  onChange={(event, page) => {
                    getCandidates(page - 1);
                  }}
                />
              )}
              {searcheredCandidates.idCandidato && (
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
