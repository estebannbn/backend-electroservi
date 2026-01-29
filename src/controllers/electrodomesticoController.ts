
import { Request, Response } from "express";
import { obtenerElectrodomestico, crearElectrodomestico } from "../services/electrodomesticoService.js";
import { ElectrodomesticoType } from "../schema/electrodomesticoSchema.js";

export const obtenerElectrodomesticoController = async(_req: Request, res: Response) => {
    const electrodomestico = await  obtenerElectrodomestico();
    res.json(electrodomestico);
}

export const crearElectrodomesticoController = async(_req: Request<null, null, ElectrodomesticoType, null>, res: Response) => {
    try {
        const data = _req.body;
        const electrodomestico = await crearElectrodomestico(data);
        res.status(201).json(electrodomestico);
    } catch (error) { 
    return res.status(400).json({ error: `Error al crear electrodoméstico` })
    }
}