import { Cliente } from "../classes/clientes";
import { Quarto } from "../classes/quartos";


export class Reserva {
    id: string;
    clienteId: string;
    quartoId: string;
    dataEntrada: string;
    dataSaida: string;

    constructor(id: string, clienteId: string, quartoId: string, dataEntrada: string, dataSaida: string) {
        this.id = id;
        this.clienteId = clienteId;
        this.quartoId = quartoId;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
}