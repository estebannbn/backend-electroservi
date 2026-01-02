import { Request, Response } from "express";
import { obtenerTrabajo } from "../services/trabajoService.js";

export const obtenerTrabajoController = async(_req: Request, res: Response) => {
    const trabajo = await  obtenerTrabajo();
    res.json(trabajo);
}