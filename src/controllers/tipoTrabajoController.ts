import { Request, Response } from "express";
import { obtenerTipoTrabajo } from "../services/tipodetrabajoService.js";

export const obtenerTipoTrabajoController = async(_req: Request, res: Response) => {
    const tipoTrabajo = await  obtenerTipoTrabajo();
    res.json(tipoTrabajo);
}