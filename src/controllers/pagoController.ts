import { Request, Response } from "express";
import { obtenerPago } from "../services/pagoService.js";



export const obtenerPagoController = async(_req: Request, res: Response) => {
    const pago = await  obtenerPago();
    res.json(pago);
}