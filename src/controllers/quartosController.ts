import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Quarto } from "../classes/quartos";

const localStorage = new LocalStorage('./scratch');
const STORAGE_KEY = 'quartos';

const verQuartosArmazenados = (): Quarto[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const salvarQuarto = (quartos: Quarto[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quartos));
};

export const criarQuartos = (req: Request, res: Response): void => {
    const quartos = verQuartosArmazenados();
    const novoQuarto: Quarto = new Quarto(uuidv4(), req.body.numero, req.body.tipo, req.body.preco);
    quartos.push(novoQuarto);
    salvarQuarto(quartos);
    res.status(201).json(novoQuarto);
};

export const verQuartos = (req: Request, res: Response): void => {
    const quartos = verQuartosArmazenados();
    res.json(quartos);
};

export const atualizarQuartos = (req: Request, res: Response): void => {
    const { id } = req.params
    const quartoAtualizado: Quarto = new Quarto(id, req.body.numero, req.body.tipo, req.body.preco);
    const quartos = verQuartosArmazenados();
    const index = quartos.findIndex(q => q.id === id);
    if(index !== -1) {
        quartos[index] = quartoAtualizado
        salvarQuarto(quartos);
        res.json(quartoAtualizado);
    } else {
        res.status(404).json({ message: 'Quarto não encontrado' });
    }
};

export const excluirQuartos = (req: Request, res: Response): void => {
    const { id } = req.params;
    const quartos = verQuartosArmazenados();
    const filtrarQuartos = quartos.filter(q => q.id !== id);
    salvarQuarto(filtrarQuartos);
    res.status(204).send();
};