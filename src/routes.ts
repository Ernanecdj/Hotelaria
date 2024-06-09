import { Router } from "express";

import {
    criarReservas,
    verReservas,
    atualizarReservas,
    excluirReservas
} from './controllers/reservaController';

import {
    criarClientes,
    verClientes,
    atulaizarClientes,
    excluirClientes
} from './controllers/clientesController'

import {
    criarQuartos,
    verQuartos,
    atualizarQuartos,
    excluirQuartos
} from './controllers/quartosController'

import {
    criarServicos,
    verServicos,
    atualizarServicos,
    excluirServicos
} from './controllers/servicosController'

const router = Router();

//Rotas de reserva
router.post('/reservas', criarReservas);
router.get('/reservas', verReservas);
router.put('/reservas/:id', atualizarReservas);
router.delete('/reservas/:id', excluirReservas);

//Rotas de cliente
router.post('/clientes', criarClientes);
router.get('/clientes', verClientes);
router.put('/clientes/:id', atulaizarClientes);
router.delete('/clientes/:id', excluirClientes);

//rotas de quartos
router.post('/quartos', criarQuartos);
router.get('/quartos', verQuartos);
router.put('/quartos/:id', atualizarQuartos);
router.delete('/quartos/:id', excluirQuartos);

//rotas de serviços
router.post('/servicos', criarServicos);
router.get('/servicos', verServicos);
router.put('/servicos/:id', atualizarServicos);
router.delete('/servicos/:id', excluirServicos);

export default router;