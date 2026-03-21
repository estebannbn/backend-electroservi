import { Request, Response } from 'express';
import { crearItemDeRepuesto, obtenerItemDeRepuesto } from '../services/itemDeRepuestoService.js';
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