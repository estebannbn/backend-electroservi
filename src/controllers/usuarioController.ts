// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";
import {
    obtenerUsuarios,
    crearTecnico,
    crearCliente,
    crearAdministrador,
    editarUsuario, obtenerUsuarioPorId
} from "../services/usuarioService";
import { TipoUsuario, CrearUsuarioInput } from "../interfaces";

// En plural, traer todos los usuarios
// TODO: Agregar try catch
export const obtenerUsuariosController = async(_req: Request<null,null,null,{tipo: TipoUsuario}>, res: Response) => {
    const {tipo} = _req.query
    const usuarios = await obtenerUsuarios(tipo)
    res.json({usuarios});
};


export const crearUsuarioController = async(_req: Request<{ tipo: TipoUsuario }, null, CrearUsuarioInput, null>, res: Response) => {
    try {
        const {tipo} = _req.params;
        const datosUsuario: CrearUsuarioInput = _req.body;
        if (!tipo) {
            return res.status(400).json({ error: "Falta parámetro 'tipo' en la ruta" });
        }

        let usuario;
        if (tipo === "tecnico") {
            usuario = await crearTecnico(datosUsuario);
        } else if (tipo === "cliente") {
            usuario = await crearCliente(datosUsuario);
        } else if (tipo === "administrador") {
            usuario = await crearAdministrador(datosUsuario);
        } else {
            return res.status(400).json({ error: `Tipo de usuario inválido: ${tipo}` });
        }

        return res.status(201).json({
            message: tipo + ' creado correctamente',
            usuario });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor al crear el usuario" });
    }
}


export const editarUsuarioController = async(_req: Request<number, any, Partial<CrearUsuarioInput>, any>, res: Response) => {
    try {
        const id = _req.params
        const datosUsuario = _req.body
        return await editarUsuario(id, datosUsuario)
    }catch (error) {
        console.error("Error al editar usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor al editar el usuario" });
    }
}