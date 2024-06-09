import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Cliente } from "../classes/clientes";

const localStorage = new LocalStorage('./scratch');
const STORAGE_KEY = 'clientes';

const verClientesArmazenados = (): Cliente[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const salvarCliente = (clientes: Cliente[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
};

export const criarClientes = (req: Request, res: Response): void => {
    const clientes = verClientesArmazenados();
    const novoCliente: Cliente = new Cliente(uuidv4(), req.body.nome, req.body.cpf, req.body.telefone);
    clientes.push(novoCliente);
    salvarCliente(clientes);
    res.status(201).json(novoCliente);
};

export const verClientes = (req: Request, res: Response): void => {
    const clientes = verClientesArmazenados();
    res.json(clientes);
};

export const atulaizarClientes = (req: Request, res: Response): void => {
    const { id } = req.params
    const clienteAtualizado: Cliente = new Cliente(id, req.body.nome, req.body.cpf, req.body.telefone);
    const clientes = verClientesArmazenados();
    const index = clientes.findIndex(c => c.id === id);
    if(index !== -1) {
        clientes[index] = clienteAtualizado
        salvarCliente(clientes);
        res.json(clienteAtualizado);
    } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
    }
};

export const excluirClientes = (req: Request, res: Response): void => {
    const { id } = req.params;
    const clientes = verClientesArmazenados();
    const filtrarClientes = clientes.filter(c => c.id !== id);
    salvarCliente(filtrarClientes);
    res.status(204).send();
};