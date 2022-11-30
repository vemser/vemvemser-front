export type TBoolean = "T" | "F";

export interface ILogin {
  email: string;
  senha: string;
}

export interface IAuthContext {
  auth: (values: ILogin) => Promise<void>;
  loginDados: ILoginDados;
}

export interface ICandidateForm {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento?: string;
  rg: string;
  estado: string;
  cidade: string;
  cpf: string;
  pcd: TBoolean;
}

export interface IInscriptionForm {
  genero: string;
  orientacao: string;
  matriculadoBoolean: TBoolean;
  curso: string;
  instituicao: string;
  turno: "MANHA" | "TARDE" | "NOITE";
  github: string;
  desafiosBoolean: TBoolean | boolean;
  problemasBoolean: boolean;
  reconhecimentoBoolean: boolean;
  altruismoBoolean: boolean;
  resposta: string;
  curriculo?: any;
  lgpdBoolean: boolean;
  provaBoolean: TBoolean | boolean;
  ingles: string;
  espanhol: string;
  neurodiversidade: string;
  efetivacaoBoolean: TBoolean | boolean;
  disponibilidadeBoolean: TBoolean | boolean;
  configuracoes: string;
  linkedin: string;
  trilhas: [];
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
  getTrilhas: () => void;
  trilhas: ITrilhas[];
  data: IInscriptionForm & ICandidateForm;
  createCandidate: (
    formulario: IInscriptionForm,
    candidato: ICandidateForm
  ) => Promise<void>;
  updateCurriculo: (idFormulario: number, curriculo: any) => void;
}

export interface ITrilhas {
  idTrilha: number;
  nome: string;
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IGestor {
  nome: string;
  email: string;
  senha?: string;
  tipoCargo?: number | string;
  idGestor?: number;
}

export interface IGestorDados {
  idGestor: number;
  nome: string;
  email: string;
  cargoDto: {
    idCargo: number;
    nome: string;
  };
}

export interface ILoginDados {
  token: string;
  idGestor: number;
  cargoDto: {
    idCargo: number;
    nome: string;
  };
}

export interface ITabelaGestorPage {
  totalPages: number;
  atualPage: number;
  pageSize: number;
}

export type ISearchColaborators = Pick<IGestor, "nome" | "email" | "tipoCargo">;

export interface IUser extends IGestor {
  confirmarSenha?: boolean;
}

export interface IManagerContext {
  createNewManager: (manager: IGestor) => Promise<void>;
  getManagers: (page: number) => Promise<void>;
  deleteManager: (idManager: number) => Promise<void>;
  editManager: (idGestor: number, managerData: IGestor) => Promise<void>;
  loading: boolean;
  gestorDados: IGestorDados[];
  pageDados: ITabelaGestorPage;
  gestorLogado: IGestorDados;
}
