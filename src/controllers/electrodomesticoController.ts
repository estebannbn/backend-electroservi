
import { Request, Response } from "express";
import { obtenerElectrodomestico } from "../services/electrodomesticoService.js";

export const obtenerElectrodomesticoController = async(_req: Request, res: Response) => {
    const electrodomestico = await  obtenerElectrodomestico();
    res.json(electrodomestico);
}