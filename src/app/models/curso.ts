export interface Curso {
  id: string;
  nome: string;
  codigo: string;
  descricao: string;
  cargaHoraria: number;
  duracaoMeses: number;
  quantidadeModulos: number;
  quantidadeDisciplinas: number;
  modalidade: string;
  nivel: string;
  areaConhecimento: string;
  coordenador: string;
  valorMensalidade: number;
  vagasDisponiveis: number;
  ativo: boolean;
  dataInicio: Date;
  dataCriacao: Date;
}

export type CreateCursoDTO = Omit<Curso, 'id' | 'dataCriacao'>;

export function createCurso(data: CreateCursoDTO): Omit<Curso, 'id'> {
  return {
    ...data,
    dataCriacao: new Date()
  };
}