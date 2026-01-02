
import { Request, Response } from "express";
import { obtenerServicio } from "../services/servicioService.js";

export const obtenerServicioController = async(_req: Request, res: Response) => {
    const servicio = await  obtenerServicio();
    res.json(servicio);
}