// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";
import { obtenerUsuarios } from "../services/usuarioService";
import { TipoUsuario } from "../interfaces";



// En plural, traer todos los usuarios
export const obtenerUsuariosController = async(_req: Request<TipoUsuario>, res: Response) => {
    const tipo = _req.params || 'todos'
    const usuarios = await obtenerUsuarios(tipo)
    res.json({usuarios});
};

export const crearUsuarioController = async(req: Request, res: Response) => {
    
}