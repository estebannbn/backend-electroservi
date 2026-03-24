import { Request, Response } from "express";
import { crearServicio, obtenerServicio } from "../services/servicioService.js";
import { ServicioType } from "../schema/servicioSchema.js";

// Trae los servicios por cliente
// Podria ser modificado si los CU lo requieren
export const obtenerServicioController = async (_req: Request, res: Response) => {
    const clienteId = _req.query.clienteId ? parseInt(_req.query.clienteId as string) : undefined;
    const servicio = await obtenerServicio(clienteId);
    res.json(servicio);
}

export const crearServicioController = async (_req: Request<null, null, ServicioType>, res: Response) => {
    try {
        const servicio = await crearServicio(_req.body);
        res.status(201).json(servicio);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
}