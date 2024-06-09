export class Servicos {
    id: string;
    nome: string;
    descricao: string;
    preco: number;

    constructor(id: string, nome: string, descricao: string, preco: number) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }
}