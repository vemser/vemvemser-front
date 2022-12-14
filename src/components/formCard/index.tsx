import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import { useCandidates } from "../../context/CandidatesContext";
import { IFormCardProps } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";

const steps: string[] = [
  "Informações Cadastrais",
  "Formulário de Inscrição",
  "Finalização",
];

export const FormCard = ({
  children,
  currentStep,
  prevFormStep,
}: IFormCardProps) => {
  const navigate = useNavigate();
  const { requestStatus } = useCandidates();

  return (
    <div>
      {currentStep < 3 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" component="h1">
              {steps[currentStep]}
            </Typography>
          </Box>
          <Stepper
            activeStep={currentStep}
            sx={{
              my: 2,
              alignItems: {
                xs: "flex-start",
                lg: "center",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    gap: {
                      xs: 1,
                      sm: 0,
                    },
                    textAlign: "center",
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentStep > 0 && currentStep < 2 && (
            <Button onClick={prevFormStep} variant="outlined" sx={{ mb: 2 }}>
              Voltar
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
              sx={{ mb: 2 }}
            >
              Ir para o início
            </Button>
          )}

          {requestStatus !== 200 && requestStatus !== 0 && (
            <Button
              onClick={prevFormStep}
              variant="outlined"
              sx={{ mb: 2, ml: 1 }}
            >
              Voltar
            </Button>
          )}
        </>
      )}
      {children}
    </div>
  );
};

export const FormCompleted: React.FC = () => {
  const { data, createCandidate, loading, requestStatus } =
    useCandidates();

  const formulario = {
    matriculadoBoolean: data.matriculadoBoolean,
    curso: data.curso,
    instituicao: data.instituicao,
    turno: data.turno,
    github: data.github,
    desafiosBoolean: data.desafiosBoolean,
    problemasBoolean: data.problemasBoolean,
    reconhecimentoBoolean: data.reconhecimentoBoolean,
    altruismoBoolean: data.altruismoBoolean,
    resposta: data.resposta,
    lgpdBoolean: data.lgpdBoolean,
    provaBoolean: data.provaBoolean,
    ingles: data.ingles,
    espanhol: data.espanhol,
    neurodiversidade: data.neurodiversidade,
    efetivacaoBoolean: data.efetivacaoBoolean,
    disponibilidadeBoolean: data.disponibilidadeBoolean,
    configuracoes: data.configuracoes,
    linkedin: data.linkedin,
    trilhas: data.trilhas,
    genero: data.genero,
    orientacao: data.orientacao,
  };

  const candidato = {
    nome: data.nome,
    email: data.email,
    dataNascimento: data.dataNascimento,
    telefone: data.telefone,
    rg: data.rg,
    estado: data.estado,
    cidade: data.cidade,
    cpf: data.cpf,
    pcd: data.pcd,
  };

  const pdf = data.curriculo;

  useEffect(() => {
    const formData = new FormData();
    formData.append("file", pdf);

    if (pdf) {
      createCandidate(formulario, candidato, formData);
    } else {
      createCandidate(formulario, candidato);
    }
  }, []);

  return (
    // <Alert
    //   severity="success"
    //   sx={{
    //     mt: 2,
    //     borderRadius: 4,
    //   }}
    //   data-testid="formCompleted"
    // >
    //   <AlertTitle>
    //     Você completou a sua inscrição no <strong>VemSer DBC</strong>!
    //   </AlertTitle>
    //   Em breve você receberá um e-mail com o resultado do seu processo seletivo.
    // </Alert>
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {requestStatus === 200 && (
            <Alert
              severity="success"
              sx={{
                mt: 2,
                borderRadius: 4,
              }}
              data-testid="formCompleted"
            >
              <AlertTitle>
                Você completou a sua inscrição no <strong>VemSer DBC</strong>!
              </AlertTitle>
              Em breve você receberá um e-mail com o resultado do seu processo
              seletivo.
            </Alert>
          )}
          {requestStatus === 400 && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                borderRadius: 4,
              }}
              data-testid="formCompleted"
            >
              <AlertTitle>Ops! Algo deu errado.</AlertTitle>
            </Alert>
          )}

          {requestStatus === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
