// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";

export const getUsuarios = (_req: Request, res: Response) => {

    res.json([{ id: 1, nombre: "Juan" }, { id: 2, nombre: "Ana" }]);
};

export const crearUsuario = (req: Request, res: Response) => {
    const nuevo = req.body;
    res.status(201).json({ mensaje: "Usuario creado", datos: nuevo });
};
