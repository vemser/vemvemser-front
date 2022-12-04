import * as yup from "yup";

const currentYear = new Date().getFullYear();
// currentYear - 16
const formattedYear = currentYear - 16;

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .max(50, "Máximo de 50 caracteres"),
});

export const stepOneSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O campo de nome é obrigatório")
    .min(3, "É necessário no mínimo 3 letras")
    .max(50, "É necessário no máximo 50 letras")
    .matches(/^[a-zA-Z ]*$/, "Nome inválido"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Email obrigatório")
    .max(250, "Máximo de 250 caracteres"),
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
    .min(7, "O RG precisa ter no mínimo 7 caracteres")
    .max(12, "O RG precisa ter no máximo 12 caracteres"),
  estado: yup.string().required("Estado obrigatório"),
  cidade: yup
    .string()
    .min(3, "É necessário no mínimo 3 letras")
    .required("Cidade obrigatório")
    .max(20, "Máximo de 20 caracteres"),
  dataNascimento: yup
    .date()
    .required("Data de nascimento obrigatória")
    .max(new Date(formattedYear, 1, 1), "Você precisa ter mais de 16 anos")
    .min(new Date(1900, 1, 1), "Data inválida")
    .typeError("Data inválida"),
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
  trilhas: yup.array().min(1, "É necessário selecionar pelo menos uma trilha"),
});

export const userSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .max(50, "Máximo 50 caracteres"),
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
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .max(50, "Máximo 50 caracteres"),
  email: yup
    .string()
    .matches(
      /^[\w-.]+@dbccompany.com.br$/,
      "Só é válido o email com @dbccompany.com.br"
    ),
});

export const recoverSchema = yup.object().shape({
  senha: yup
    .string()
    .required("Senha obrigatória")
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
    .oneOf([yup.ref("senha"), null], "As senhas devem ser iguais"),
});
