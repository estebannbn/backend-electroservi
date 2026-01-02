import { Request, Response } from "express";
import { obtenerRepuesto } from "../services/repuestoService.js";

export const obtenerRepuestoController = async(_req: Request, res: Response) => {
    const repuesto = await  obtenerRepuesto();
    res.json(repuesto);
}