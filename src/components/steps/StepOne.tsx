import {
  Grid,
  TextField,
  Paper,
  Typography,
  Divider,
  Stack,
  Button,
  Select,
  FormLabel,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCandidates } from "../../context/CandidatesContext";
import { ICandidateForm, IStepProps } from "../../utils/interfaces";
import { states } from "../../utils/states";
import React, { useState } from "react";
import { cpf as cpfTest } from "cpf-cnpj-validator";

import InputMask from "react-input-mask";
import { stepOneSchema } from "../../utils/schemas";

export const StepOne: React.FC<IStepProps> = ({ nextFormStep, formStep }) => {
  const { setFormValues } = useCandidates();
  const [isPcd, setIsPcd] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICandidateForm>({
    mode: "all",
    resolver: yupResolver(stepOneSchema),
  });

  const handleFormSubmit = (data: ICandidateForm) => {
    data.telefone = data.telefone.replace(/[^0-9]/g, "");
    console.log(data.dataNascimento)

    setFormValues(data);
    nextFormStep && nextFormStep();
  };

  const { cpf } = watch();
  const checkCpf = cpfTest.isValid(cpf);

  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      spacing={2}
      my={4}
      sx={{
        display: formStep === 0 ? "" : "none",
      }}
    >
      <Grid
        component="form"
        container
        spacing={2}
        alignItems="center"
        alignContent="center"
        id="s1-candidato-registrar"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Grid item xs={12}>
          <TextField
            label="Nome"
            variant="outlined"
            sx={{
              width: "100%",
            }}
            id="s1-candidato-nome"
            error={!!errors.nome}
            {...register("nome")}
          />
          <Typography variant="caption" color="error">
            {errors.nome?.message}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            sx={{
              width: "100%",
            }}
            id="s1-candidato-email"
            error={!!errors.email}
            {...register("email")}
          />
          <Typography variant="caption" color="error">
            {errors.email?.message}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <InputMask mask="999.999.999-99" maskChar=" " {...register("cpf")}>
            {
              // @ts-ignore
              (inputProps) => (
                <TextField
                  {...inputProps}
                  label="CPF"
                  variant="outlined"
                  error={checkCpf === false && cpf?.length >= 11}
                  id="s1-candidato-cpf"
                  sx={{
                    width: "100%",
                  }}
                />
              )
            }
          </InputMask>

          <Typography variant="caption" color="error">
            {checkCpf === false &&
              cpf?.length >= 11 &&
              "O CPF precisa ser válido"}
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" flexDirection="column">
          <InputMask
            mask="(99)99999-9999"
            maskChar=" "
            {...register("telefone")}
          >
            {
              // @ts-ignore
              (inputProps) => (
                <TextField
                  {...inputProps}
                  label="Telefone"
                  variant="outlined"
                  error={!!errors.telefone}
                  id="s1-candidato-telefone"
                />
              )
            }
          </InputMask>
          <Typography variant="caption" color="error">
            {errors.telefone?.message}
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" flexDirection="column">
          <TextField
            label="RG"
            variant="outlined"
            {...register("rg")}
            error={!!errors.rg}
            id="s1-candidato-rg"
          />
          <Typography variant="caption" color="error">
            {errors.rg?.message}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Select
            native
            label="Estado"
            variant="outlined"
            sx={{ width: "100%" }}
            id="s1-candidato-estado"
            error={!!errors.estado}
            {...register("estado")}
          >
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.value}
              </option>
            ))}
          </Select>
          <Typography variant="caption" color="error">
            {errors.estado?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Cidade"
            variant="outlined"
            sx={{ width: "100%" }}
            id="s1-candidato-cidade"
            error={!!errors.cidade}
            {...register("cidade")}
          />
          <Typography variant="caption" color="error">
            {errors.cidade?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
           Qual a sua data de nascimento?
          </FormLabel>
              <TextField
                type="date"
                variant="outlined"
                sx={{ width: "100%" }}
                id="s1-candidato-data-nascimento"
                error={!!errors.dataNascimento}
                {...register("dataNascimento")}
              />
              <Typography variant="caption" color="error">
                {errors.dataNascimento?.message}
              </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            Você possui alguma deficiência?
          </FormLabel>
          <Tooltip
            title="Essa não é uma pergunta obrigatória, mas é importante para que possamos oferecer uma melhor experiência para você."
            placement="bottom-end"
            arrow
          >
            <Select
              native
              variant="outlined"
              sx={{ width: "100%" }}
              id="s1-candidato-pcd"
              onChange={(e) => {
                e.target.value === "true" ? setIsPcd(true) : setIsPcd(false);
              }}
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </Select>
          </Tooltip>
        </Grid>

        {isPcd && (
          <Grid item xs={12}>
            <Tooltip
              title="Essa não é uma pergunta obrigatória, mas é importante para que possamos oferecer uma melhor experiência para você."
              placement="bottom-start"
              arrow
            >
              <TextField
                sx={{
                  width: "100%",
                }}
                label="Qual a sua deficiência"
                variant="outlined"
                id="s1-candidato-pcd-descricao"
                {...register("pcd")}
              />
            </Tooltip>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            id="s1-candidato-enviar"
            disabled={checkCpf === false}
          >
            Próximo
          </Button>
        </Grid>
      </Grid>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxWidth: {
            xs: "100%",
            md: "400px",
            lg: "600px",
          },
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Inscrições da 11° edição do <strong>#VemSer</strong> DBC
        </Typography>
        <Divider />
        <Typography variant="h6" component="h2">
          Quer fazer parte de um programa de capacitação que desenvolve e
          transforma estudantes em profissionais, utilizando as tecnologias que
          mais empregam no mercado de trabalho?
        </Typography>

        <Typography variant="body1">
          O Vem Ser DBC atualmente é composto por três trilhas de formação:{" "}
          <strong>Front-End, Back-end e Testes Automatizados (QA)</strong>. Por
          meio destas trilhas de formação, os estudantes selecionados são
          capacitados com as tecnologias mais utilizadas no mercado de trabalho.
        </Typography>
        <Typography variant="body1">
          A formação tem duração de <strong>12 semanas</strong> e os
          selecionados terão aulas online e ao vivo de segunda a sexta-feira,
          das 13:30 às 17:30 (horário de Brasília). Além disso, receberão uma
          bolsa auxílio mensal no valor de <strong>R$ 800,00</strong>.
        </Typography>
        <Divider />
      </Paper>
    </Stack>
  );
};
