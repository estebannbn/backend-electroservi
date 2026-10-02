import { Request, Response } from 'express';
import { crearItemDeMaterial, obtenerItemDeMaterial, eliminarItemDeMaterial, editarItemDeMaterial } from '../services/itemDeMaterialService.js';
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

export const editarItemDeMaterialController = async (_req: Request<{ servicioId: string, materialId: string }, null, ItemDeMaterialType>, res: Response) => {
    try {
        const itemDeMaterial = await editarItemDeMaterial(parseInt(_req.params.servicioId), parseInt(_req.params.materialId), _req.body);
        res.json(itemDeMaterial);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el item de material' });
    }
}

export const eliminarItemDeMaterialController = async (_req: Request<{ servicioId: string, materialId: string }>, res: Response) => {
    try {
        await eliminarItemDeMaterial(parseInt(_req.params.servicioId), parseInt(_req.params.materialId));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el item de material' });
    }
}