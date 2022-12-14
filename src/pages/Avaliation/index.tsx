import {
  Box,
  Button,
  Grid,
  Pagination,
  Stack,
  TextField,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MagnifyingGlass } from "phosphor-react";
import { ISearchByEmail } from "../../utils/interfaces";
import React, { useEffect } from "react";
import { useAvaliation } from "../../context/AvaliationContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../utils/schemas";

export const Avaliation = () => {
  const {
    getAvaliations,
    getAvaliationByEmail,
    avaliationData,
    searcheredAvaliation,
  } = useAvaliation();
  const navigate = useNavigate();

  useEffect(() => {
    getAvaliations(0);
  }, []);

  const columns = [
    { field: "aprovado", headerName: "Status", minWidth: 160, flex: 1 },
    {
      field: "nomeCandidato",
      headerName: "Nome do Candidato",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "emailCandidato",
      headerName: "Email do Candidato",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "nomeAvaliador",
      headerName: "Nome do Avaliador",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "emailAvliador",
      headerName: "Email do Avaliador",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "telefoneCandidato",
      headerName: "Telefone do Candidato",
      width: 150,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchByEmail>({
    resolver: yupResolver(emailSchema),
  });

  const handleSearch = (data: ISearchByEmail) => {
    getAvaliationByEmail(data.email);
  };

  const rows = () => {
    if (searcheredAvaliation.length >= 1) {
      return searcheredAvaliation?.map((avaliacao) => {
        return {
          id: avaliacao.idAvaliacao,
          aprovado: avaliacao.aprovado === "T" ? "Aprovado" : "Reprovado",
          nomeCandidato: avaliacao.inscricao.candidato.nome,
          emailCandidato: avaliacao.inscricao.candidato.email,
          nomeAvaliador: avaliacao.avaliador.nome,
          emailAvliador: avaliacao.avaliador.email,
          telefoneCandidato: avaliacao.inscricao.candidato.telefone?.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
          ),
          idAvaliacao: avaliacao.idAvaliacao,
        };
      });
    } else {
      return avaliationData?.elementos?.map((avaliacao) => {
        return {
          id: avaliacao.inscricao.idInscricao,
          aprovado: avaliacao.aprovado === "T" ? "Aprovado" : "Reprovado",
          nomeCandidato: avaliacao.inscricao.candidato.nome,
          emailCandidato: avaliacao.inscricao.candidato.email,
          nomeAvaliador: avaliacao.avaliador.nome,
          emailAvliador: avaliacao.avaliador.email,
          telefoneCandidato: avaliacao.inscricao.candidato.telefone?.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
          ),
          idAvaliacao: avaliacao.idAvaliacao,
        };
      });
    }
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
              label={
                errors.email?.message
                  ? errors.email?.message
                  : "Pesquisar por email"
              }
              error={!!errors.email}
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
            {avaliationData.elementos ? (
              <DataGrid
                rows={rows()}
                columns={columns}
                pageSize={20}
                onRowClick={(params) => {
                  navigate("/avaliations/curriculum", {
                    state: {
                      emailCandidato: params.row.emailCandidato,
                      idAvaliacao: params.row.idAvaliacao,
                    },
                  });
                }}
                hideFooterPagination
              />
            ) : (
              <Skeleton variant="rectangular" animation="wave" height={400} />
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
              {!searcheredAvaliation.length && (
                <Pagination
                  count={avaliationData?.quantidadePaginas}
                  color="primary"
                  size="small"
                  onChange={(event, page) => {
                    getAvaliations(page - 1);
                  }}
                />
              )}
              {searcheredAvaliation.length > 0 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    getAvaliationByEmail("");
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
