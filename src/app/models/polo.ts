export interface Polo {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  coordenador: string;
  ativo: boolean;
  dataCriacao: Date;
}

export type CreatePoloDTO = Omit<Polo, 'id' | 'dataCriacao'>;

export function createPolo(data: CreatePoloDTO): Omit<Polo, 'id'> {
  return {
    ...data,
    dataCriacao: new Date()
  };
}