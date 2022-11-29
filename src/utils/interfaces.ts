export interface ILogin {
  email: string;
  senha: string;
}

export interface ICandidateForm {
  nome: string;
  email: string;
  telefone: string;
  rg: string;
  estado: string;
  cidade: string;
  cpf: string;
}

export type TBoolean = 'T' | 'F';

export interface IInscriptionForm {
  matriculado: TBoolean;
  curso: string;
  instituicao: string;
  turno: "MANHA" | "TARDE" | "NOITE";
  github: string;
  desafios: TBoolean;
  problemas: boolean;
  reconhecimento: boolean;
  altruismo: boolean;
  resposta: string;
  curriculo: any;
  lgpd: boolean;
}

export interface IDrawerContainerProps {
  children: React.ReactNode;
  window?: () => Window;
}

export interface IStepProps {
  nextFormStep?: () => void;
  formStep?: number;
}

export interface IFormCardProps {
  children?: React.ReactNode;
  currentStep: number;
  prevFormStep: () => void;
}

export interface ICandidateContext {
  setFormValues: (values: object) => void;
  data: object;
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IGestor {
  nome: string;
  email: string;
  senha: string;
  tipoCargo: number;
  idGestor?: number;
}

export type ISearchColaborators = Pick<IGestor, "nome" | "email" | "tipoCargo">;

export interface IUser extends IGestor {
  confirmarSenha?: boolean;
}

export interface IManagerContext {
  handleUserlogin: (user: ILogin) => Promise<void>;
  createNewManager: (manager: IGestor) => Promise<void>;
  getManagers: () => Promise<void>;
  deleteManager: (idManager: number) => Promise<void>;
  gestorDadosLogin: object;
  loading: boolean;
  gestorDados: IGestor[];
}
