import { Request, Response } from "express";
import { obtenerMaterial } from "../services/materialService.js";

export const obtenerMaterialController = async(_req: Request, res: Response) => {
    const material = await  obtenerMaterial();
    res.json(material);
}