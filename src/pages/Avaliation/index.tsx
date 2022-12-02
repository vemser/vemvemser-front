import { Box, Button, Grid, Pagination, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MagnifyingGlass } from "phosphor-react";
import { IAvaliation } from "../../utils/interfaces";
import React, { useEffect } from "react";
import { useAvaliation } from "../../context/AvaliationContext";

export const Avaliation = () => {
  const { getAvaliations, avaliationData } = useAvaliation();

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

  const rows = () => {
    return avaliationData?.elementos?.map((avaliacao) => {
      return {
        id: avaliacao.inscricao.candidato.idCandidato,
        aprovado: avaliacao.aprovado === "T" ? "Aprovado" : "Reprovado",
        nomeCandidato: avaliacao.inscricao.candidato.nome,
        emailCandidato: avaliacao.inscricao.candidato.email,
        nomeAvaliador: avaliacao.avaliador.nome,
        emailAvliador: avaliacao.avaliador.email,
        telefoneCandidato: avaliacao.inscricao.candidato.telefone,
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
            {avaliationData.elementos && (
              <DataGrid
                rows={rows()}
                columns={columns}
                pageSize={20}
                hideFooterPagination
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
              <Pagination
                count={avaliationData?.quantidadePaginas}
                color="primary"
                size="small"
                onChange={(event, page) => {
                  getAvaliations(page - 1);
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};
