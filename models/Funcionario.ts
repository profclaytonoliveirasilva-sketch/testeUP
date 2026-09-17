export default class Funcionario {

  nome: string;
  matricula: string;
  email: string;
  unidade: string;
  endereco: string;
  telefone: string;

  constructor(
    nome: string,
    matricula: string,
    email: string,
    unidade: string,
    endereco: string,
    telefone: string
  ) {
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.unidade = unidade;
    this.endereco = endereco;
    this.telefone = telefone;
  }
}