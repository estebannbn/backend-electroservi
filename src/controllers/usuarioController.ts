// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";
import {
    obtenerUsuarios,
    crearTecnico,
    crearCliente,
    crearAdministrador,
    editarUsuario, obtenerUsuarioPorEmail
} from "../services/usuarioService";
import {TipoUsuario, CrearUsuarioInput, LoginInput} from "../Interfaces/usuario";
import {hashPassword, verifyPassword} from "../utils/contraseñaHandler";
import { UsuarioType } from "../schema/usuarioSchema";

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
        console.log(tipo)
        const datosUsuario: CrearUsuarioInput = _req.body;
        datosUsuario.contraseña = await hashPassword(datosUsuario.contraseña)
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

export const editarUsuarioController = async(_req: Request<{ id: string }, any, Partial<UsuarioType>, any>, res: Response) => {
    try {
        const id = Number(_req.params.id);
        const datosUsuario = _req.body;
        const usuarioActualizado = await editarUsuario(id, datosUsuario);
        return res.json({ usuario: usuarioActualizado });
    } catch (error) {
        console.error("Error al editar usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor al editar el usuario" });
    }
}

export const usuarioLogin = async(_req: Request<null,null,LoginInput>, res: Response) => {
    try{
        const loginData = _req.body
        const usuario = await obtenerUsuarioPorEmail(loginData.mail)
        if(!usuario){res.status(404).json({error: 'Usuario no encontrado'})}
        const verifica = await verifyPassword(loginData.contraseña, usuario.contraseña)
        if (verifica === true) {
            console.log({loginData})
            res.status(200).json({usuario})
        }else{
            throw new Error('Contraseña incorrecta')
        }
    }catch (error: any) {
        res.status(401).json({error: error.message})
    }
}