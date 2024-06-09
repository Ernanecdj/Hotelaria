export class Quarto {
    id: string;
    numero: number;
    tipo: string;
    preco: number;

    constructor(id: string, numero: number, tipo: string, preco: number) {
        this.id = id;
        this.numero = numero;
        this.tipo = tipo;
        this.preco = preco;
    }
}