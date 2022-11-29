import React from "react";
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
import { IFormCardProps } from "../../utils/interfaces";

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
          <Stepper activeStep={currentStep} sx={{ my: 2, alignItems: {
            xs: "flex-start",
            lg: "center",
          } }}>
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
        </>
      )}
      {children}
    </div>
  );
};

export const FormCompleted = () => {
  const { data } = useCandidates();
  console.log(data)

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
