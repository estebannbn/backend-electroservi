import { Request, Response } from "express";
import { obtenerMaterial, crearMaterial } from "../services/materialService.js";
import { MaterialType } from "../schema/materialSchema.js";

export const obtenerMaterialController = async (_req: Request, res: Response) => {
    const material = await obtenerMaterial();
    res.json(material);
}

export const crearMaterialController = async (_req: Request<null, null, MaterialType>, res: Response) => {
    try {
        const material = await crearMaterial(_req.body);
        res.json(material);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear el material" });
    }
}