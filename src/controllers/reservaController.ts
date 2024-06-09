import { Request, Response } from "express";
import { json } from "stream/consumers";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Reserva } from "../classes/reserva";
import { Cliente } from "../classes/clientes";
import { Quarto } from "../classes/quartos";

const localStorage = new LocalStorage('./scratch');
const STORAGE_KEY = 'reservasHotel';
const CLIENTE_KEY = 'clientes';
const QUARTO_KEY = 'quartos';


const verReservasArmazenadas = (): Reserva[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const salvarReserva = (reservas: Reserva[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
};

const pegaClienteArmazenado = (): Cliente[] => {
    const data = localStorage.getItem(CLIENTE_KEY);
    return data ? JSON.parse(data) : []; 
};

const pegaQuartoArmazenado = (): Quarto[] => {
    const data = localStorage.getItem(QUARTO_KEY);
    return data ? JSON.parse(data) : [];
};

export const criarReservas = (req: Request, res: Response) => {
    const {clienteId, quartoId, dataEntrada, dataSaida} = req.body;

    const clientes = pegaClienteArmazenado();
    const quartos = pegaQuartoArmazenado();

    const clienteExiste = clientes.find(c => c.id === clienteId);
    const quartoExiste = quartos.find(q => q.id === quartoId);

    if(!clienteExiste || !quartoExiste) {
        return res.status(404).json({ message: 'Cliente ou quarto não entocntrado' })
    }

    const reservas = verReservasArmazenadas();
    const novaReserva = new Reserva(uuidv4(), clienteId, quartoId, dataEntrada, dataSaida);
    reservas.push(novaReserva);
    salvarReserva(reservas)
    res.status(201).json(novaReserva);
};

export const verReservas = (req: Request, res: Response): void => {
    const reservas = verReservasArmazenadas();
    res.json(reservas);
}

export const atualizarReservas = (req: Request, res: Response) => {
    const { id } = req.params;
    const {clienteId, quartoId, dataEntrada, dataSaida} = req.body;

    const clientes = pegaClienteArmazenado();
    const quartos = pegaQuartoArmazenado();

    const cliente = clientes.find(c => c.id === clienteId);
    const quarto = quartos.find(q => q.id === quartoId);

    if (!cliente || !quarto) {
        return res.status(404).json({ message: 'Cliente ou quarto não entocntrado' })
    }

    const reservas = verReservasArmazenadas();
    const index = reservas.findIndex(r => r.id === id);
    
    if (index !== -1) {
        const atualizarReservas = new Reserva(id, clienteId, quartoId, dataEntrada, dataSaida);
        reservas[index] = atualizarReservas;
        salvarReserva(reservas);
        res.json(atualizarReservas);
    } else {
        res.status(404).json({ message: 'Reserva não encontrada' });
    }
};

export const excluirReservas = (req: Request, res: Response): void => {
    const { id } = req.params;
    const reservas = verReservasArmazenadas();
    const filtrarReserva = reservas.filter(r => r.id !== id);
    salvarReserva(filtrarReserva);
    res.status(204).send
};