import { Box, Container } from "@mui/material";
import { useState } from "react";
import { FormCard, FormCompleted } from "../../components/formCard";
import { StepOne } from "../../components/steps";
import { StepTwo } from "../../components/steps/StepTwo";

export const Candidates: React.FC = () => {
  const [formStep, setFormStep] = useState<number>(0);
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.light",
          padding: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          my: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          borderRadius: {
            xs: 3,
          },
        }}
      >
        <>
          <Box>
            <Box>
              <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
                {formStep >= 0 && (
                  <StepOne formStep={formStep} nextFormStep={nextFormStep} />
                )}

                {formStep >= 1 && (
                  <StepTwo formStep={formStep} nextFormStep={nextFormStep} />
                )}

                {formStep > 1 && <FormCompleted />}
              </FormCard>
            </Box>
          </Box>
        </>
      </Box>
    </Container>
  );
};
