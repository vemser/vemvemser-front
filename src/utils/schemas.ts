import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

export const stepOneSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O campo de nome é obrigatório")
    .min(3, "É necessário no mínimo 3 letras")
    .matches(/^[a-zA-Z ]*$/, "Nome inválido"),
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .matches(/^(\d{3}\.?\d{3}\.?\d{3}\-?\d{2})$/, "CPF inválido"), // eslint-disable-line
  telefone: yup
    .string()
    .required("Telefone obrigatório")
    .matches(
      /^\([1-9]{2}\)(?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/, // eslint-disable-line
      "O telefone precisa ser válido."
    ),
  rg: yup
    .string()
    .required("RG obrigatório")
    .min(8, "O RG precisa ter no mínimo 8 caracteres")
    .max(12, "O RG precisa ter no máximo 9 caracteres"),
  estado: yup.string().required("Estado obrigatório"),
  cidade: yup
    .string()
    .min(3, "É necessário no mínimo 3 letras")
    .required("Cidade obrigatório"),
  dataNascimento: yup.string().required("Data de nascimento obrigatória"),
});

export const stepTwoSchema = yup.object().shape({
  resposta: yup
    .string()
    .when(
      [
        "altruismoBoolean",
        "reconhecimentoBoolean",
        "desafiosBoolean",
        "problemasBoolean",
      ],
      {
        is: (
          altruismo: boolean,
          reconhecimento: boolean,
          desafios: boolean,
          problemas: boolean
        ) => {
          return (
            altruismo === false &&
            reconhecimento === false &&
            desafios === false &&
            problemas === false
          );
        },
        then: yup
          .string()
          .required(
            "Preencha o campo 'Outro motivo' ou selecione uma das opções acima"
          ),
        otherwise: yup.string(),
      }
    ),
  instituicao: yup.string().when("matriculadoBoolean", {
    is: "T",
    then: yup
      .string()
      .min(2, "É necessário 2 caracteres, no mínimo")
      .required("Preencha o campo com o nome da instituição"),
  }),
  curso: yup.string().when("matriculadoBoolean", {
    is: "T",
    then: yup
      .string()
      .min(2, "É necessário 2 caracteres, no mínimo")
      .required("Preencha o campo com o nome do curso"),
  }),
  github: yup.string(),
  lgpdBoolean: yup.boolean().oneOf([true], "É necessário aceitar os termos"),
  configuracoes: yup.string().required("É necessário informar a configuração"),
  // trilhas tem que selecionar pelo menos um do checkbox
  trilhas: yup.array().min(1, "É necessário selecionar pelo menos uma trilha"),
});

export const userSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .matches(
      /^[\w-.]+@dbccompany.com.br$/,
      "Só é válido o email com @dbccompany.com.br"
    ),
  senha: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(/^(?=.*[A-Z])/, "A senha deve ter no mínimo 1 letra maiúscula")
    .matches(/^(?=.*[a-z])/, "A senha deve ter no mínimo 1 letra minúscula")
    .matches(/^(?=.*[0-9])/, "A senha deve ter no mínimo 1 número")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "A senha deve ter no mínimo 1 caracter especial"
    ),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas devem ser iguais")
    .required("A confirmação de senha é obrigatória"),
});

export const userEditSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .matches(
      /^[\w-.]+@dbccompany.com.br$/,
      "Só é válido o email com @dbccompany.com.br"
    ),
});
