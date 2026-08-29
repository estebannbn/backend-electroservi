import { Request, Response } from "express";
import { obtenerRepuesto, crearRepuesto } from "../services/repuestoService.js";
import { RepuestoType } from "../schema/repuestoSchema.js";

export const obtenerRepuestoController = async (_req: Request, res: Response) => {
    const repuesto = await obtenerRepuesto();
    res.json(repuesto);
}


export const crearRepuestoController = async (_req: Request<null, null, RepuestoType>, res: Response) => {
    try {
        const repuesto = await crearRepuesto(_req.body);
        res.json(repuesto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear el repuesto" });
    }
}