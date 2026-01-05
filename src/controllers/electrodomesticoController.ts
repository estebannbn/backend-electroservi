
import { Request, Response } from "express";
import { obtenerElectrodomestico, crearElectrodomestico } from "../services/electrodomesticoService.js";
import { CrearElectrodomesticoInput } from "../Interfaces/electrodomestico.js";

export const obtenerElectrodomesticoController = async(_req: Request, res: Response) => {
    const electrodomestico = await  obtenerElectrodomestico();
    res.json(electrodomestico);
}

export const crearElectrodomesticoController = async(_req: Request<null, null, CrearElectrodomesticoInput, null>, res: Response) => {
    const data = _req.body;
    const electrodomestico = await crearElectrodomestico(data);
    res.json(electrodomestico);
}