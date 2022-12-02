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
} from "@mui/material";
import { useCandidates } from "../../context/CandidatesContext";
import { IFormCardProps, IInscriptionForm } from "../../utils/interfaces";

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

          {currentStep > 0 && currentStep < 3 && (
            <Button onClick={prevFormStep} variant="outlined" sx={{ mb: 2 }}>
              Voltar
            </Button>
          )}
        </>
      )}
      {children}
    </div>
  );
};

export const FormCompleted = () => {
  const { data, createCandidate, updateCurriculo } = useCandidates();

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

  const formData = new FormData();
  formData.append("file", pdf[0]);

  useEffect(() => {
    if (pdf) {
      createCandidate(formulario, candidato, pdf);
    } else {
      createCandidate(formulario, candidato);
    }
    console.log(formData);
  }, []);

  return (
    <Alert
      severity="success"
      sx={{
        mt: 2,
        borderRadius: 4,
      }}
    >
      <AlertTitle>
        Você completou a sua inscrição no <strong>VemSer DBC</strong>!
      </AlertTitle>
      Em breve você receberá um e-mail com o resultado do seu processo seletivo.
    </Alert>
  );
};
