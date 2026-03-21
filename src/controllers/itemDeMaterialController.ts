import { Request, Response } from 'express';
import { crearItemDeMaterial, obtenerItemDeMaterial } from '../services/itemDeMaterialService.js';
import { ItemDeMaterialType } from '../schema/itemDeMaterialSchema.js';

export const obtenerItemDeMaterialController = async (_req: Request, res: Response) => {
    const itemDeMaterial = await obtenerItemDeMaterial();
    res.json(itemDeMaterial);
}

export const crearItemDeMaterialController = async (_req: Request<null, null, ItemDeMaterialType>, res: Response) => {
    try {
        const itemDeMaterial = await crearItemDeMaterial(_req.body);
        res.status(201).json(itemDeMaterial);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el item de material' });
    }
}