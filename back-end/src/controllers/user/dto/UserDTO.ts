export interface CreateUserDTO {
  cpf: string;
  password: string;
}

export interface ReturnUserDTO {
  id: number;
  cpf: string;
}