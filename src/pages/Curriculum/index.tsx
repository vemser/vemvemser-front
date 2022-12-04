import {
  Stack,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

export const Curriculum: React.FC = () => {
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

  const {
    getFormularioById,
    getCandidateById,
    candidatePdf,
    candidateSelected,
  } = useCandidates();
  const { registerAvaliation, deleteAvaliation } = useAvaliation();

  const [formattedCandidatePdf, setFormattedCandidatePdf] =
    useState<string>("null");
  const { state } = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonAvaliar = document.querySelector("#buttonAvaliar");

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
    getCandidateById(state.id);
  }, []);

  useEffect(() => {
    getFormularioById(candidateSelected.candidato?.formulario?.idFormulario);
  }, [candidateSelected]);

  useEffect(() => {
    const blob = base64toBlob(candidatePdf);
    const url = URL.createObjectURL(blob);

    setFormattedCandidatePdf(url);
  }, [candidatePdf]);

  const { candidato } = candidateSelected;
  const formulario = candidato?.formulario;

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
        <Grid item xs={6}>
          {candidateSelected.avaliado && (
            <>
              <Button
                variant="contained"
                disabled={candidateSelected.avaliado === "T"}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                id="buttonAvaliar"
                onClick={handleClick}
              >
                {candidateSelected.avaliado === "T" ? "Avaliado" : "Avaliar"}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    registerAvaliation(true, candidateSelected.idInscricao);
                    buttonAvaliar?.remove();
                    handleClose();
                  }}
                >
                  Aprovar
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    registerAvaliation(false, candidateSelected.idInscricao);
                    buttonAvaliar?.remove();
                    handleClose();
                  }}
                >
                  Reprovar
                </MenuItem>
              </Menu>
            </>
          )}
        </Grid>
        {candidatePdf !== "" && (
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Download>
              {(props: RenderDownloadProps) => {
                return (
                  <Button variant="contained" onClick={props.onClick}>
                    Baixar currículo
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
              Informações Pessoais
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
                <PessoalInformation title="Nome:" value={candidato?.nome} />
                <PessoalInformation title="Email:" value={candidato?.email} />
                <PessoalInformation
                  title="Telefone:"
                  value={candidato?.telefone?.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
                />
                <PessoalInformation title="CPF:" value={candidato?.cpf} />
                <PessoalInformation title="RG:" value={candidato?.rg} />
                <PessoalInformation
                  title="Data de Nascimento:"
                  value={candidato?.dataNascimento?.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1") || "Não informado"}
                />
                <PessoalInformation title="Estado:" value={candidato?.estado} />
                <PessoalInformation title="Cidade:" value={candidato?.cidade} />
                <PessoalInformation
                  title="Deficiência:"
                  value={candidato?.pcd === "F" ? "Não possui" : candidato?.pcd}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" gutterBottom>
              Formulário
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
                <PessoalInformation title="Curso:" value={formulario?.curso} />
                <PessoalInformation title="Turno:" value="Noite" />
                <PessoalInformation
                  title="Instituição"
                  value={formulario?.instituicao}
                />
                <PessoalInformation
                  title="Nível de inglês:"
                  value={formulario?.ingles}
                />
                <PessoalInformation
                  title="Nível de espanhol:"
                  value={formulario?.espanhol}
                />
                <PessoalInformation title="Neurodiversidade:" value="Não" />
                <PessoalInformation
                  title="Orientação sexual:"
                  value={formulario?.orientacao}
                />
                <PessoalInformation
                  title="Gênero:"
                  value={formulario?.genero}
                />
                <PessoalInformation
                  title="Motivo:"
                  value={formulario?.resposta}
                />
                <PessoalInformation
                  title="Gosta de desafios:"
                  value={formulario?.desafios === "F" ? "Não" : "Sim"}
                />
                <PessoalInformation
                  title="Gosta de resolver problemas:"
                  value={formulario?.problemas === "F" ? "Não" : "Sim"}
                />
                <PessoalInformation
                  title="Gosta do reconhecimento da área:"
                  value={formulario?.reconhecimento === "F" ? "Não" : "Sim"}
                />
                <PessoalInformation
                  title="Quer ajudar as pessoas:"
                  value={formulario?.altruismo === "F" ? "Não" : "Sim"}
                />
                <PessoalInformation
                  title="Conhecimentos básicos:"
                  value={formulario?.prova === "F" ? "Não" : "Sim"}
                />
                <PessoalInformation
                  title="Disponibilidade de trabalho:"
                  value={formulario?.efetivacao === "F" ? "Não" : "Sim"}
                />
                <PessoalInformation
                  title="Disponibilidade de estudo:"
                  value={formulario?.disponibilidade === "F" ? "Não" : "Sim"}
                />
                <PessoalInformation
                  title="Trilhas:"
                  value={formulario?.trilhas
                    .map((trilha: ITrilhas) => trilha.nome)
                    .join(", ")}
                />
                <PessoalInformation
                  title="Hardware:"
                  value={formulario?.configuracoes}
                />
                <PessoalInformation
                  title="Linkedin:"
                  value={formulario?.linkedin}
                />
                <PessoalInformation
                  title="Github:"
                  value={formulario?.github}
                />
                <PessoalInformation
                  title="LGPD:"
                  value={formulario?.lgpdBoolean === "F" ? "Não" : "Sim"}
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
    </Stack>
  );
};
