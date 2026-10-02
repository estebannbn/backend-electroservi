import { Request, Response } from 'express';
import { crearItemDeRepuesto, obtenerItemDeRepuesto, editarItemDeRepuesto, eliminarItemDeRepuesto } from '../services/itemDeRepuestoService.js';
import { ItemDeRepuestoType } from '../schema/itemDeRepuestoSchema.js';

export const obtenerItemDeRepuestoController = async (_req: Request, res: Response) => {
    const itemDeRepuesto = await obtenerItemDeRepuesto();
    res.json(itemDeRepuesto);
}

export const crearItemDeRepuestoController = async (_req: Request<null, null, ItemDeRepuestoType>, res: Response) => {
    try {
        const itemDeRepuesto = await crearItemDeRepuesto(_req.body);
        res.status(201).json(itemDeRepuesto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el item de repuesto' });
    }
}

export const editarItemDeRepuestoController = async (_req: Request<{servicioId: string, repuestoId: string}, null, ItemDeRepuestoType>, res: Response) => {
    try {
        const itemDeRepuesto = await editarItemDeRepuesto(parseInt(_req.params.servicioId), parseInt(_req.params.repuestoId), _req.body);
        res.json(itemDeRepuesto);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el item de repuesto' });
    }
}

export const eliminarItemDeRepuestoController = async (_req: Request<{servicioId: string, repuestoId: string}>, res: Response) => {
    try {
        await eliminarItemDeRepuesto(parseInt(_req.params.servicioId), parseInt(_req.params.repuestoId));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el item de repuesto' });
    }
}