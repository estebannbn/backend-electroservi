import { Request, Response } from "express";
import { crearServicio, obtenerServicio } from "../services/servicioService.js";
import { ServicioType } from "../schema/servicioSchema.js";

export const obtenerServicioController = async(_req: Request, res: Response) => {
    const servicio = await  obtenerServicio();
    res.json(servicio);
}

export const crearServicioController = async(_req: Request< null, null, ServicioType >, res: Response) => {
    try {
        const servicio = await crearServicio(_req.body);
        res.status(201).json(servicio);
    }catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
}