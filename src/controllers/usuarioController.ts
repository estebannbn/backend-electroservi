// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";
import { obtenerUsuarios } from "../services/usuarioService";

// En plural, traer todos los usuarios
export const obtenerUsuariosController = async(_req: Request, res: Response) => {
    const usuarios = await obtenerUsuarios('todos')
    res.json({usuarios});
};

export const crearUsuarioController = async(req: Request, res: Response) => {
    
}