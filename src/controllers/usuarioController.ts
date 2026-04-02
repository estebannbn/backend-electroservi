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
import { LoginInput, TipoUsuario } from "../Interfaces/usuario";
import { hashPassword, verifyPassword } from "../utils/contraseñaHandler";
import { UsuarioType } from "../schema/usuarioSchema";
import { generateToken } from "../utils/authHandler";


// En plural, traer todos los usuarios
// TODO: Agregar try catch
export const obtenerUsuariosController = async (_req: Request<null, null, null, { tipo: TipoUsuario }>, res: Response) => {
    const { tipo } = _req.query
    const usuarios = await obtenerUsuarios(tipo)
    res.json({ usuarios });
};

export const crearUsuarioController = async (_req: Request<{ tipo: TipoUsuario }, null, UsuarioType, null>, res: Response) => {
    try {
        const { tipo } = _req.params;
        console.log(tipo)
        const datosUsuario: UsuarioType = _req.body;
        datosUsuario.contraseña = await hashPassword(datosUsuario.contraseña)
        if (!tipo) {
            res.status(400).json({ error: "Falta parámetro 'tipo' en la ruta" });
        }

        let usuario;
        if (tipo === "tecnico") {
            usuario = await crearTecnico(datosUsuario);
        } else if (tipo === "cliente") {
            usuario = await crearCliente(datosUsuario);
        } else if (tipo === "administrador") {
            usuario = await crearAdministrador(datosUsuario);
        } else {
            res.status(400).json({ error: `Tipo de usuario inválido: ${tipo}` });
        }

        res.status(201).json({
            message: tipo + ' creado correctamente',
            usuario
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error interno del servidor al crear el usuario" });
    }
}

export const editarUsuarioController = async (_req: Request<{ id: string }, any, Partial<UsuarioType>, any>, res: Response) => {
    try {
        const id = Number(_req.params.id);
        const datosUsuario = _req.body;
        
        if (datosUsuario.contraseña) {
            datosUsuario.contraseña = await hashPassword(datosUsuario.contraseña);
        }

        const usuarioActualizado = await editarUsuario(id, datosUsuario);
        res.json({ usuario: usuarioActualizado });
    } catch (error) {
        console.error("Error al editar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor al editar el usuario" });
    }
}

export const usuarioLogin = async (_req: Request<null, null, LoginInput>, res: Response) => {
    try {
        const loginData = _req.body
        const usuario = await obtenerUsuarioPorEmail(loginData.mail)
        if (!usuario) { res.status(404).json({ error: 'Usuario no encontrado' }) }
        const verifica = await verifyPassword(loginData.contraseña, usuario.contraseña)
        if (verifica === true) {
            // necesitaremos el tipo de usuario en el token para algunas funciones en el front
            const tipo = usuario.tecnico ? 'tecnico' : usuario.administrador ? 'administrador' : 'cliente'
            // podriamos tal vez guardar menos datos en el token
            const token = generateToken({ id: usuario.id, mail: usuario.mail, tipo })
            // guardamos el token en una cookie
            res.cookie('auth_token', token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 1000 // 1 hora
                }
            )
            res.status(200).json({ message: 'Login exitoso' })
        } else {
            throw new Error('Contraseña incorrecta')
        }
    } catch (error: any) {
        res.status(401).json({ error: error.message })
    }
}

export const usuarioLogout = async (_req: Request, res: Response) => {
    res.clearCookie('auth_token')
    _req.user = undefined
    res.status(200).json({ message: 'Logout exitoso' })
}

// Verificar si el usuario esta logueado
export const checkSession = async (_req: Request, res: Response) => {
    const { user } = _req
    if (!user) res.status(401).json({ error: 'No autorizado' })
    res.json({ user })
}