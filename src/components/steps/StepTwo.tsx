import {
  Grid,
  TextField,
  Typography,
  Stack,
  Button,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Select,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCandidates } from "../../context/CandidatesContext";
import { IInscriptionForm, IStepProps } from "../../utils/interfaces";
import { Radio } from "../../utils/theme";
import { useEffect, useState } from "react";
import { GithubLogo, LinkedinLogo } from "phosphor-react";
import { Box } from "@mui/system";
import { stepTwoSchema } from "../../utils/schemas";

export const StepTwo: React.FC<IStepProps> = ({ nextFormStep, formStep }) => {
  const { setFormValues, getTrilhas, trilhas } = useCandidates();
  const [anotherReason, setAnotherReason] = useState(false);
  const [isNeurodiversity, setIsNeurodiversity] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInscriptionForm>({
    mode: "all",
    defaultValues: {
      matriculadoBoolean: "T",
      turno: "MANHA",
      provaBoolean: "T",
      efetivacaoBoolean: "T",
      disponibilidadeBoolean: "T",
      trilhas: [],
    },
    resolver: yupResolver(stepTwoSchema),
  });

  useEffect(() => {
    getTrilhas();
  }, []);

  const { matriculadoBoolean, curriculo, github, linkedin } = watch();
  const curriculoIsPdf = curriculo?.[0]?.type === "application/pdf";

  const handleFormSubmit = (data: IInscriptionForm) => {
    const formValues = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "T" ? true : value === "F" ? false : value,
      ])
    );

    const trilhas = formValues.trilhas.map((trilha: string) => Number(trilha));
    formValues.trilhas = trilhas;

    formValues.curriculo = formValues.curriculo[0];

    // if (curriculoIsPdf) {
    setFormValues(formValues);
    nextFormStep && nextFormStep();
    // }
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
      data-testid="stepTwo"
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
                {...register("matriculadoBoolean")}
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
                {...register("matriculadoBoolean")}
              />
              Não
            </FormLabel>
          </Stack>
        </Grid>

        {matriculadoBoolean === "T" && (
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
        {matriculadoBoolean === "T" && (
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

            <Grid item xs={6}>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Qual o seu nível de inglês?
              </FormLabel>
              <Select
                native
                variant="outlined"
                sx={{ width: "100%" }}
                id="s1-candidato-ingles"
                {...register("ingles")}
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
                <option value="fluente">Fluente</option>
              </Select>
            </Grid>

            <Grid item xs={6}>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Qual o seu nível de espanhol?
              </FormLabel>
              <Select
                native
                variant="outlined"
                sx={{ width: "100%" }}
                id="s1-candidato-espanhol"
                {...register("espanhol")}
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
                <option value="fluente">Fluente</option>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Tooltip
                title="Algumas das neurodiversidades que podem ser consideradas são: TEA, TDAH, Altas Habilidades etc."
                placement="bottom-start"
                arrow
              >
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Você possui alguma neurodiversidade?
                </FormLabel>
              </Tooltip>
              <Tooltip
                title="Essa não é uma pergunta obrigatória, mas é importante para que possamos oferecer uma melhor experiência para você."
                placement="bottom-end"
                arrow
              >
                <Select
                  native
                  variant="outlined"
                  sx={{ width: "100%" }}
                  id="s1-candidato-neurodiversidade"
                  onChange={(e) => {
                    e.target.value === "T"
                      ? setIsNeurodiversity(true)
                      : setIsNeurodiversity(false);
                  }}
                >
                  <option value="F">Não</option>
                  <option value="T">Sim</option>
                </Select>
              </Tooltip>
            </Grid>

            {isNeurodiversity && (
              <Grid item xs={12}>
                <TextField
                  label="Qual neurodiversidade você possui?"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  id="s1-candidato-neurodiversidade-descricao"
                  {...register("neurodiversidade")}
                />
              </Grid>
            )}

            <Grid item xs={12} md={3}>
              <Tooltip
                title="Essa não é uma pergunta obrigatória, mas é importante para que possamos oferecer uma melhor experiência para você."
                placement="bottom-start"
                arrow
              >
                <Box>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Qual a sua orientação sexual?
                  </FormLabel>
                  <Select
                    native
                    variant="outlined"
                    sx={{ width: "100%" }}
                    id="s2-candidato-orientacao"
                    {...register("orientacao")}
                  >
                    <option value="heterossexual">Heterossexual</option>
                    <option value="homossexual">Homossexual</option>
                    <option value="bissexual">Bissexual</option>
                    <option value="pansexual">Pansexual</option>
                    <option value="outro">Outro</option>
                    <option value="naoInformar">Prefiro não informar</option>
                  </Select>
                </Box>
              </Tooltip>
            </Grid>

            <Grid item xs={12} md={3}>
              <Tooltip
                title="Essa não é uma pergunta obrigatória, mas é importante para que possamos oferecer uma melhor experiência para você."
                placement="bottom-start"
                arrow
              >
                <Box>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Qual a seu gênero?
                  </FormLabel>
                  <Select
                    native
                    variant="outlined"
                    sx={{ width: "100%" }}
                    id="s2-candidato-orientacao"
                    {...register("genero")}
                  >
                    <option value="cisgenero">Homem cisgênero</option>
                    <option value="transgenero">Homem transgênero</option>
                    <option value="mulherCisgenero">Mulher cisgênero</option>
                    <option value="mulherCisgenero">Mulher transgênero</option>
                    <option value="naoBinario">Não binário</option>
                    <option value="naoInformado">Prefiro não informar</option>
                  </Select>
                </Box>
              </Tooltip>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="column">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-desafio"
                      {...register("desafiosBoolean")}
                    />
                  }
                  label="Por gostar de desafios"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-problemas"
                      {...register("problemasBoolean")}
                    />
                  }
                  label="Por gostar de resolver problemas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-reconhecimento"
                      {...register("reconhecimentoBoolean")}
                    />
                  }
                  label="Pelo reconhecimento e valorização financeira do profissional de tecnologia"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      id="s2-candidato-altruismo"
                      {...register("altruismoBoolean")}
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

            <Grid item xs={12}>
              <FormLabel component="legend">
                Uma das nossas etapas eliminatórias de seleção será a realização
                de uma prova técnica. Será necessário conhecimento de lógica de
                programação e uso básico em algumas dessas tecnologias
                (Javascript, Java, Python, C e C++), mas será avaliado
                principalmente raciocínio para solução de problemas. Tens
                conhecimento necessário para realizar esta prova específica?
              </FormLabel>

              <Stack direction="row" spacing={2}>
                <FormLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 1,
                    my: 1,
                  }}
                >
                  <Radio
                    type="radio"
                    value="T"
                    id="s2-candidato-prova-sim"
                    {...register("provaBoolean")}
                  />
                  Sim
                </FormLabel>

                <FormLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 1,
                    my: 1,
                  }}
                >
                  <Radio
                    type="radio"
                    value="F"
                    id="s2-candidato-prova-nao"
                    {...register("provaBoolean")}
                  />
                  Não
                </FormLabel>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <FormLabel component="legend">
                O interesse da DBC é efetivar os participantes que se
                desenvolverem bem ao longo do período de formação. Tens
                interesse e disponibilidade para trabalhar em turno integral,
                (manhã e tarde, até 44h semanais), caso aprovado?
                (Disponibilidade de no mínimo 1 ano para ficar na DBC).
              </FormLabel>

              <Stack direction="row" spacing={2}>
                <FormLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 1,
                    my: 1,
                  }}
                >
                  <Radio
                    type="radio"
                    value="T"
                    id="s2-candidato-efetivacao-sim"
                    {...register("efetivacaoBoolean")}
                  />
                  Sim
                </FormLabel>

                <FormLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 1,
                    my: 1,
                  }}
                >
                  <Radio
                    type="radio"
                    value="F"
                    id="s2-candidato-efetivacao-nao"
                    {...register("efetivacaoBoolean")}
                  />
                  Não
                </FormLabel>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <FormLabel component="legend">
                O estágio/capacitação acontecerá de maneira virtual, no turno da
                tarde, das 13h30min às 17h30min, de segunda a sexta-feira, e
                será necessária muita dedicação extra para as atividades. Tens
                disponibilidade em outros turnos para estudo?
              </FormLabel>

              <Stack direction="row" spacing={2}>
                <FormLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 1,
                    my: 1,
                  }}
                >
                  <Radio
                    type="radio"
                    value="T"
                    id="s2-candidato-disponibilidade-sim"
                    {...register("disponibilidadeBoolean")}
                  />
                  Sim
                </FormLabel>

                <FormLabel
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 1,
                    my: 1,
                  }}
                >
                  <Radio
                    type="radio"
                    value="F"
                    id="s2-candidato-disponibilidade-nao"
                    {...register("disponibilidadeBoolean")}
                  />
                  Não
                </FormLabel>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="column">
                <FormLabel component="legend">
                  Selecione quais trilhas você desejaria participar
                </FormLabel>
                {trilhas.map((trilha) => {
                  return (
                    <FormControlLabel
                      key={trilha.idTrilha}
                      control={
                        <Checkbox
                          color="primary"
                          {...register("trilhas")}
                          id={`s2-candidato-trilha-${trilha.idTrilha}`}
                          value={trilha.idTrilha}
                        />
                      }
                      label={trilha.nome}
                    />
                  );
                })}
              </Stack>
              <Typography variant="caption" color="error">
                {errors.trilhas?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Você pode informar as configurações básicas do seu computador,
                como sistema operacional, memória RAM e processador?
              </FormLabel>

              <TextField
                label="Informações"
                variant="outlined"
                error={!!errors.configuracoes}
                sx={{
                  width: "100%",
                }}
                id="s2-candidato-sistema-operacional"
                {...register("configuracoes")}
              />
              <Typography variant="caption" color="error">
                {errors.configuracoes?.message}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4}>
              <TextField
                label="Qual o link do seu Linkedin"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                id="s2-candidato-linkedin"
                InputProps={{
                  startAdornment: (
                    <Box display="flex" alignItems="center" mr={1}>
                      <LinkedinLogo size={20} color="#1f64ff" weight="fill" />
                    </Box>
                  ),
                }}
                {...register("linkedin")}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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
                      accept="application/pdf"
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

            {!curriculo?.[0] && !github && !linkedin && (
              <Grid item xs={12}>
                <Typography variant="caption" color="error">
                  É necessário preencher pelo menos um dos campos entre Github,
                  Linkedin e currículo
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
                    {...register("lgpdBoolean")}
                  />
                }
                label="Você concorda com o tratamento dos seus dados pessoais para fins de seleção de candidatos?"
              />
              <Typography variant="caption" color="error">
                {errors.lgpdBoolean?.message}
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
              display: matriculadoBoolean === "T" ? "initial" : "none",
              width: {
                xs: "100%",
                md: "fit-content",
              },
            }}
            disabled={
              matriculadoBoolean === "F" ||
              (curriculo?.[0] && !curriculoIsPdf) ||
              (!curriculo?.[0] && !github && !linkedin)
            }
          >
            Próximo
          </Button>
          {matriculadoBoolean === "F" && (
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
