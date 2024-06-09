export class Cliente {
    id: string;
    nome: string;
    cpf: string;
    telefone: string;

    constructor(id: string, nome: string, cpf: string, telefone: string) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }
}