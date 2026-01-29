import { Request, Response } from "express";
import { crearTrabajo, obtenerTrabajo } from "../services/trabajoService.js";
import { TrabajoType } from "../schema/trabajoSchema.js";

export const obtenerTrabajoController = async(_req: Request, res: Response) => {
    const trabajo = await  obtenerTrabajo();
    res.json(trabajo);
}

export const crearTrabajoController = async(req: Request<null, null, TrabajoType >, res: Response) => {
    try {
        const trabajo = await  crearTrabajo(req.body);
        res.status(201).json({trabajo});
        }
    catch(error) {
        console.error("Error al crear trabajo:", error);
        return res.status(500).json({ error: "Error interno del servidor al crear el trabajo" });
    }}