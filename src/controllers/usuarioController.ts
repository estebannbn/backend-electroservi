// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";
import {obtenerUsuarios, crearTecnico, crearCliente, crearAdministrador} from "../services/usuarioService";
import { TipoUsuario, CrearUsuarioInput } from "../interfaces";



// En plural, traer todos los usuarios
export const obtenerUsuariosController = async(_req: Request<TipoUsuario>, res: Response) => {
    const tipo = _req.params || 'todos'
    const usuarios = await obtenerUsuarios(tipo)
    res.json({usuarios});
};

export const crearUsuarioController = async(_req: Request<TipoUsuario, any, CrearUsuarioInput, any>, res: Response) => {
    try {
        const { tipo } = _req.params as { tipo?: string };
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
