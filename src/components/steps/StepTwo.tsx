import {
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCandidates } from "../../context/CandidatesContext";
import { IInscriptionForm, IStepProps } from "../../utils/interfaces";
import { Radio } from "../../utils/theme";
import { useState } from "react";
import { GithubLogo } from "phosphor-react";
import { Box } from "@mui/system";
import { stepTwoSchema } from "../../utils/schemas";

export const StepTwo: React.FC<IStepProps> = ({ nextFormStep, formStep }) => {
  const { setFormValues } = useCandidates();
  const [anotherReason, setAnotherReason] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInscriptionForm>({
    mode: "all",
    defaultValues: {
      matriculado: "T",
      turno: "MANHA",
    },
    resolver: yupResolver(stepTwoSchema),
  });

  const { matriculado, curriculo, github } = watch();
  const curriculoIsPdf = curriculo?.[0]?.type === "application/pdf";

  const handleFormSubmit = (data: IInscriptionForm) => {
    const mappedData = Object.entries(data).map(([key, value]) => {
      if (typeof value === "boolean") {
        return [key, value ? "T" : "F"];
      }
      return [key, value];
    });

    const convertedData = Object.fromEntries(mappedData);

    setFormValues(convertedData);
    nextFormStep && nextFormStep();
  };

  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      sx={{
        display: formStep === 1 ? "" : "none",
      }}
    >
      <Grid
        component="form"
        container
        spacing={2}
        alignContent="center"
        id="s2-candidato-registrar"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Grid item xs={12} md={6}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            Você é matriculado em algum curso de graduação ou técnico?
          </FormLabel>
          <Stack direction="row" spacing={2}>
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
              }}
            >
              <Radio
                type="radio"
                value="T"
                id="s2-candidato-matriculado-sim"
                {...register("matriculado")}
              />
              Sim
            </FormLabel>
            <FormLabel
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
              }}
            >
              <Radio
                type="radio"
                value="F"
                id="s2-candidato-matriculado-nao"
                {...register("matriculado")}
              />
              Não
            </FormLabel>
          </Stack>
        </Grid>

        {matriculado === "T" && (
          <Grid item xs={12} md={6}>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Em qual turno você estuda?
            </FormLabel>
            <Stack direction="row" spacing={2}>
              <FormLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Radio
                  type="radio"
                  value="MANHA"
                  id="s2-candidato-turno-manha"
                  {...register("turno")}
                />
                Manhã
              </FormLabel>
              <FormLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Radio
                  type="radio"
                  value="TARDE"
                  id="s2-candidato-turno-tarde"
                  {...register("turno")}
                />
                Tarde
              </FormLabel>
              <FormLabel
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Radio
                  type="radio"
                  value="NOITE"
                  id="s2-candidato-turno-noite"
                  {...register("turno")}
                />
                Noite
              </FormLabel>
            </Stack>
          </Grid>
        )}
        {matriculado === "T" && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                label="Instituição de ensino matriculado"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                id="s2-candidato-instituicao"
                error={!!errors.instituicao}
                {...register("instituicao")}
              />
              <Typography variant="caption" color="error">
                {errors.instituicao?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Curso"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                id="s2-candidato-curso"
                error={!!errors.curso}
                {...register("curso")}
              />
              <Typography variant="caption" color="error">
                {errors.curso?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="column">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-desafio"
                      {...register("desafios")}
                    />
                  }
                  label="Por gostar de desafios"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-problemas"
                      {...register("problemas")}
                    />
                  }
                  label="Por gostar de resolver problemas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-reconhecimento"
                      {...register("reconhecimento")}
                    />
                  }
                  label="Pelo reconhecimento e valorização financeira do profissional de tecnologia"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-altruismo"
                      {...register("altruismo")}
                    />
                  }
                  label="Por querer ajudar outras pessoas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-outro"
                      onChange={() => setAnotherReason((state) => !state)}
                    />
                  }
                  label="Outro motivo"
                />
                <Typography variant="caption" color="error" sx={{ mb: 1 }}>
                  {errors.resposta?.message}
                </Typography>
                {anotherReason && (
                  <TextField
                    label="Por qual motivo você se interessou pela área de tecnologia?"
                    variant="outlined"
                    multiline={true}
                    sx={{
                      width: "100%",
                    }}
                    id="s2-candidato-motivo"
                    error={!!errors.resposta}
                    {...register("resposta")}
                  />
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Qual o link do seu repositorio no GitHub?"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                id="s2-candidato-github"
                InputProps={{
                  startAdornment: (
                    <Box display="flex" alignItems="center" mr={1}>
                      <GithubLogo size={20} color="#1f64ff" weight="fill" />
                    </Box>
                  ),
                }}
                error={!!errors.github}
                {...register("github")}
              />
              <Typography variant="caption" color="error">
                {errors.github?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  alignItems: {
                    xs: "flex-start",
                    md: "center",
                  },
                  gap: 1,
                }}
              >
                <Typography variant="body1">
                  Deseja adicionar um currículo?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    alignItems: {
                      xs: "flex-start",
                      md: "center",
                    },
                    gap: 1,
                    width: {
                      xs: "100%",
                      md: "fit-content",
                    },
                  }}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      width: {
                        xs: "100%",
                        md: "fit-content",
                      },
                    }}
                  >
                    Adicionar
                    <input
                      hidden
                      accept="application/pdf,application/vnd.ms-excel"
                      multiple
                      type="file"
                      id="s2-candidato-curriculo"
                      {...register("curriculo")}
                    />
                  </Button>
                </Box>
              </Box>
              {!curriculoIsPdf && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block" }}
                >
                  O arquivo deve ser um PDF
                </Typography>
              )}
              {curriculo?.[0] && (
                <Typography variant="caption" color="primary">
                  <strong>Arquivo:</strong> {curriculo?.[0]?.name}
                </Typography>
              )}
            </Grid>

            {!curriculo?.[0] && !github && (
              <Grid item xs={12}>
                <Typography variant="caption" color="error">
                  É necessário preencher pelo menos um dos campos entre Github e
                  currículo
                </Typography>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    id="s2-candidato-lgpd"
                    {...register("lgpd")}
                  />
                }
                label="Você concorda com o tratamento dos seus dados pessoais para fins de seleção de candidatos?"
              />
              <Typography variant="caption" color="error">
                {errors.lgpd?.message}
              </Typography>
            </Grid>
          </>
        )}

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            id="s2-candidato-enviar"
            sx={{
              display: matriculado === "T" ? "initial" : "none",
              width: {
                xs: "100%",
                md: "fit-content",
              },
            }}
            disabled={
              matriculado === "F" ||
              (curriculo?.[0] && !curriculoIsPdf) ||
              (!curriculo?.[0] && !github)
            }
          >
            Próximo
          </Button>
          {matriculado === "F" && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                maxWidth: 500,
              }}
            >
              Devido as restrições impostas pelas leis brasileiras, somente
              alunos que possuem vínculo com uma instituição de ensino podem se
              candidatar às vagas de estágio.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
