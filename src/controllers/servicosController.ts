import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Servicos } from "../classes/servicos";

const localStorage = new LocalStorage('./scratch');
const STORAGE_KEY = 'servicos';

const verServicosArmazenados = (): Servicos[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const salvarServico = (servicos: Servicos[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
};

export const criarServicos = (req: Request, res: Response): void => {
    const servicos = verServicosArmazenados();
    const novoServico: Servicos = new Servicos(uuidv4(), req.body.nome, req.body.descricao, req.body.preco);
    servicos.push(novoServico);
    salvarServico(servicos);
    res.status(201).json(novoServico);
};

export const verServicos = (req: Request, res: Response): void => {
    const servicos = verServicosArmazenados();
    res.json(servicos);
};

export const atualizarServicos = (req: Request, res: Response): void => {
    const { id } = req.params
    const servicoAtualizado: Servicos = new Servicos(id, req.body.nome, req.body.descricao, req.body.preco);
    const servicos = verServicosArmazenados();
    const index = servicos.findIndex(s => s.id === id);
    if(index !== -1) {
        servicos[index] = servicoAtualizado
        salvarServico(servicos);
        res.json(servicoAtualizado);
    } else {
        res.status(404).json({ message: 'Serviço não encontrado' });
    }
};

export const excluirServicos = (req: Request, res: Response): void => {
    const { id } = req.params;
    const servicos = verServicosArmazenados();
    const filtrarServicos = servicos.filter(c => c.id !== id);
    salvarServico(filtrarServicos);
    res.status(204).send();
};