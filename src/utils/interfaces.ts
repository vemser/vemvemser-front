export type TBoolean = "T" | "F";

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
  genero: string;
  pcd: TBoolean;
}

export interface IInscriptionForm {
  matriculadoBoolean: TBoolean;
  curso: string;
  instituicao: string;
  turno: "MANHA" | "TARDE" | "NOITE";
  github: string;
  desafiosBoolean: TBoolean;
  problemasBoolean: boolean;
  reconhecimentoBoolean: boolean;
  altruismoBoolean: boolean;
  resposta: string;
  curriculo: any;
  lgpdBoolean: boolean;

  provaBoolean: TBoolean;
  ingles: string;
  espanhol: string;
  neurodiversidade: string;
  efetivacaoBoolean: TBoolean;
  disponibilidadeBoolean: TBoolean;
  configuracoes: string;
  linkedin: string;
  trilhas: [];
  /*

 falta: TRILHA
 */
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
  data: object;
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
  senha: string;
  tipoCargo: number;
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
  gestorDados: IGestorDados[];
}
