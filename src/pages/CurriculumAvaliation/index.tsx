import {
  Stack,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCandidates } from "../../context/CandidatesContext";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { getFilePlugin, RenderDownloadProps } from "@react-pdf-viewer/get-file";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ITrilhas } from "../../utils/interfaces";
import { useAvaliation } from "../../context/AvaliationContext";

export const PessoalInformation: React.FC<{
  title: string;
  value: string;
  xs?: number;
  md?: number;
}> = ({ title, value, xs = 12, md = 12 }) => {
  return (
    <Grid item xs={xs} md={md}>
      <Typography component="p">
        <strong>{title}</strong> {value}
      </Typography>
    </Grid>
  );
};

export const CurriculumAvaliation: React.FC = () => {
  const getFilePluginInstance = getFilePlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { Download } = getFilePluginInstance;
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const handleClickDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleClickDeleteClose = () => {
    setOpenDelete(false);
  };

  const { getFormularioById, candidatePdf } = useCandidates();
  const { deleteAvaliation, getAvaliationById, avaliationById } =
    useAvaliation();

  const [formattedCandidatePdf, setFormattedCandidatePdf] =
    useState<string>("null");
  const { state } = useLocation();

  const base64toBlob = (data: string) => {
    const byteString = atob(data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "application/pdf" });
  };

  useEffect(() => {
    getAvaliationById(state.idAvaliacao);
  }, []);

  useEffect(() => {
    Object.keys(avaliationById).length > 0 &&
      getFormularioById(
        avaliationById.inscricao.candidato.formulario.idFormulario
      );
  }, [avaliationById]);

  useEffect(() => {
    const blob = base64toBlob(candidatePdf);
    const url = URL.createObjectURL(blob);

    setFormattedCandidatePdf(url);
  }, [candidatePdf]);

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
      {Object.keys(avaliationById).length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack
              direction={{
                xs: "row",
              }}
              spacing={1}
              sx={{
                alignItems: "center",
                width: "100%",
                justifyContent: {
                  xs: "center",
                  lg: "flex-start",
                },
              }}
            >
              {avaliationById?.aprovado === "T" ? (
                <Chip
                  sx={{
                    width: {
                      xs: "100%",
                      md: "auto",
                    },
                  }}
                  label="Aprovado"
                  color="primary"
                />
              ) : (
                <Chip
                  sx={{
                    width: {
                      xs: "100%",
                      md: "auto",
                    },
                  }}
                  label="Reprovado"
                  color="secondary"
                  variant="outlined"
                />
              )}
              <Button
                variant="contained"
                onClick={handleClickDeleteOpen}
                color="secondary"
                sx={{
                  px: {
                    xs: 2,
                    md: 2,
                  },
                  width: {
                    xs: "100%",
                    md: "auto",
                  },
                }}
              >
                Deletar
              </Button>
              <Dialog
                open={openDelete}
                onClose={handleClickDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
              >
                <DialogTitle id="alert-dialog-title">
                  Deseja deletar esse candidato?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Todos os dados referente a esse candidato ser??o deletados
                    permanentemente.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickDeleteClose} variant="contained">
                    Fechar
                  </Button>
                  <Button
                    onClick={() => {
                      handleClickDeleteClose();

                      deleteAvaliation(avaliationById?.idAvaliacao);
                      navigate("/avaliations");
                    }}
                    autoFocus
                    variant="contained"
                    color="secondary"
                  >
                    Deletar
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </Grid>
          {candidatePdf !== "" && (
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  md: "flex-end",
                },
              }}
            >
              <Download>
                {(props: RenderDownloadProps) => {
                  return (
                    <Button
                      variant="contained"
                      onClick={props.onClick}
                      sx={{
                        width: {
                          xs: "100%",
                          md: "auto",
                        },
                      }}
                    >
                      Baixar curr??culo
                    </Button>
                  );
                }}
              </Download>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={candidatePdf !== "" ? 5 : 12}
            spacing={2}
          >
            <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom>
                Informa????es Pessoais
              </Typography>
              <Paper
                elevation={1}
                sx={{
                  p: {
                    xs: 2,
                  },
                }}
              >
                <Grid container spacing={1}>
                  <PessoalInformation
                    title="Nome:"
                    value={avaliationById.inscricao.candidato.nome}
                  />
                  <PessoalInformation
                    title="Email:"
                    value={avaliationById.inscricao.candidato.email}
                  />
                  <PessoalInformation
                    title="Telefone:"
                    value={avaliationById.inscricao.candidato.telefone?.replace(
                      /(\d{2})(\d{5})(\d{4})/,
                      "($1) $2-$3"
                    )}
                  />
                  <PessoalInformation
                    title="CPF:"
                    value={avaliationById.inscricao.candidato.cpf}
                  />
                  <PessoalInformation
                    title="RG:"
                    value={avaliationById.inscricao.candidato.rg}
                  />
                  <PessoalInformation
                    title="Data de Nascimento:"
                    value={
                      avaliationById.inscricao.candidato.dataNascimento?.replace(
                        /(\d{4})-(\d{2})-(\d{2})/,
                        "$3/$2/$1"
                      ) || "N??o informado"
                    }
                  />
                  <PessoalInformation
                    title="Estado:"
                    value={avaliationById.inscricao.candidato.estado}
                  />
                  <PessoalInformation
                    title="Cidade:"
                    value={avaliationById.inscricao.candidato.cidade}
                  />
                  <PessoalInformation
                    title="Defici??ncia:"
                    value={
                      avaliationById.inscricao.candidato.pcd === "F"
                        ? "N??o possui"
                        : avaliationById.inscricao.candidato.pcd
                    }
                  />
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom>
                Formul??rio
              </Typography>
              <Paper
                elevation={1}
                sx={{
                  p: {
                    xs: 2,
                  },
                }}
              >
                <Grid container spacing={1}>
                  <PessoalInformation title="Matriculado:" value="Sim" />
                  <PessoalInformation
                    title="Curso:"
                    value={avaliationById.inscricao.candidato.formulario.curso}
                  />
                  <PessoalInformation title="Turno:" value="Noite" />
                  <PessoalInformation
                    title="Institui????o"
                    value={
                      avaliationById.inscricao.candidato.formulario.instituicao
                    }
                  />
                  <PessoalInformation
                    title="N??vel de ingl??s:"
                    value={avaliationById.inscricao.candidato.formulario.ingles}
                  />
                  <PessoalInformation
                    title="N??vel de espanhol:"
                    value={
                      avaliationById.inscricao.candidato.formulario.espanhol
                    }
                  />
                  <PessoalInformation title="Neurodiversidade:" value="N??o" />
                  <PessoalInformation
                    title="Orienta????o sexual:"
                    value={
                      avaliationById.inscricao.candidato.formulario.orientacao
                    }
                  />
                  <PessoalInformation
                    title="G??nero:"
                    value={avaliationById.inscricao.candidato.formulario.genero}
                  />
                  <PessoalInformation
                    title="Motivo:"
                    value={
                      avaliationById.inscricao.candidato.formulario.resposta
                    }
                  />
                  <PessoalInformation
                    title="Gosta de desafios:"
                    value={
                      avaliationById.inscricao.candidato.formulario.desafios ===
                      "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                  <PessoalInformation
                    title="Gosta de resolver problemas:"
                    value={
                      avaliationById.inscricao.candidato.formulario
                        .problemas === "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                  <PessoalInformation
                    title="Gosta do reconhecimento da ??rea:"
                    value={
                      avaliationById.inscricao.candidato.formulario
                        .reconhecimento === "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                  <PessoalInformation
                    title="Quer ajudar as pessoas:"
                    value={
                      avaliationById.inscricao.candidato.formulario
                        .altruismo === "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                  <PessoalInformation
                    title="Conhecimentos b??sicos:"
                    value={
                      avaliationById.inscricao.candidato.formulario.prova ===
                      "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                  <PessoalInformation
                    title="Disponibilidade de trabalho:"
                    value={
                      avaliationById.inscricao.candidato.formulario
                        .efetivacao === "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                  <PessoalInformation
                    title="Disponibilidade de estudo:"
                    value={
                      avaliationById.inscricao.candidato.formulario
                        .disponibilidade === "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                  <PessoalInformation
                    title="Trilhas:"
                    value={avaliationById.inscricao.candidato.formulario.trilhas
                      .map((trilha: ITrilhas) => trilha.nome)
                      .join(", ")}
                  />
                  <PessoalInformation
                    title="Hardware:"
                    value={
                      avaliationById.inscricao.candidato.formulario
                        .configuracoes
                    }
                  />
                  <PessoalInformation
                    title="Linkedin:"
                    value={
                      avaliationById.inscricao.candidato.formulario.linkedin
                    }
                  />
                  <PessoalInformation
                    title="Github:"
                    value={avaliationById.inscricao.candidato.formulario.github}
                  />
                  <PessoalInformation
                    title="LGPD:"
                    value={
                      avaliationById.inscricao.candidato.formulario
                        .lgpdBoolean === "F"
                        ? "N??o"
                        : "Sim"
                    }
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          {candidatePdf !== "" && (
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                width: "100%",
              }}
            >
              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js">
                <Viewer
                  fileUrl={formattedCandidatePdf}
                  plugins={[getFilePluginInstance, defaultLayoutPluginInstance]}
                />
              </Worker>
            </Grid>
          )}
        </Grid>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{
              height: "calc(100vh - 114px)",
            }}
          />
        </Box>
      )}
    </Stack>
  );
};
