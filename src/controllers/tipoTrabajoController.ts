import { Request, Response } from "express";
import { obtenerTipoTrabajo, crearTipoTrabajo } from "../services/tipoTrabajoService.js";
import { TipoTrabajoType } from "../schema/tipoTrabajoSchema.js";

export const obtenerTipoTrabajoController = async(_req: Request, res: Response) => {
    const tipoTrabajo = await  obtenerTipoTrabajo();
    res.json(tipoTrabajo);
}

export const crearTipoTrabajoController = async(_req: Request, res: Response) => {
    try {
        const tipoTrabajo = await crearTipoTrabajo(_req.body);
        res.status(201).json(tipoTrabajo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el tipo de trabajo' });
    }
}
