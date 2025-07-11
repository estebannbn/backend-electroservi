// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";
import { crearAdministrador, obtenerUsuarios } from "../services/usuarioService";
import { TipoUsuario } from "../interfaces";

// En plural, traer todos los usuarios
export const obtenerUsuariosController = (req: Request, res: Response) => {
    const { tipoElegido } = req.query
    const usuarios = obtenerUsuarios(tipoElegido as TipoUsuario)
    res.json({usuarios});
};

export const crearUsuarioController = async(req: Request, res: Response) => {
    const {tipoUsuario} = req.body
   const usuarios = crearAdministrador(tipoUsuario)
    res.json({usuarios});
}