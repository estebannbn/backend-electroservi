import { Request, Response } from "express";
import { obtenerPago, crearPago } from "../services/pagoService.js";
import { PagoType } from "../schema/pagoSchema.js";


export const obtenerPagoController = async (_req: Request, res: Response) => {
    const pago = await obtenerPago();
    res.json(pago);
}

export const crearPagoController = async (req: Request<null, null, PagoType>, res: Response) => {
    try {
        const pago = await crearPago(req.body);
        res.status(201).json(pago);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el pago" });
    }
}
