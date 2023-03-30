export interface UserLogin {
  cpf: string;
  password: string;
}

export interface UserValidLogin {user: {login: boolean} }