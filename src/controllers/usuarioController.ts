// Realizamos las operaciones de CRUD para los usuarios

// TODO: Mejorar el sistema de validacion con Zod ?

import { Request, Response } from "express";
import { crearAdministrador, crearCliente, crearTecnico, obtenerUsuarios } from "../services/usuarioService";
import { TipoUsuario } from "../interfaces";



// En plural, traer todos los usuarios
export const obtenerUsuariosController = async(_req: Request<TipoUsuario>, res: Response) => {
    const tipo = _req.params || 'todos'
    const usuarios = await obtenerUsuarios(tipo)
    console.log('users obtenidos')
    res.json({usuarios});
};


// En este caso, el _req no es de tipo TipoUsuario, sino que es un OBJETO con un campo tipo: TipoUsuario.
export const crearUsuarioController = async(_req: Request<{tipo: TipoUsuario}>, res: Response) => {
    const {tipo} = _req.params
    const data = _req.body
    let usuario;
    let dataTotal;
    try{
        switch(tipo){
        case 'administrador':
            // dataTotal contiene la data del usuario + la instruccion para crear la instancia en el tipo de usuario correspondiente
            dataTotal = {...data, administrador: {create:{}}}
            usuario = await crearAdministrador(data)
            break;
        case 'tecnico':
            dataTotal = {...data, tecnico: {create:{}}}
            usuario = await crearTecnico(data)
            break;
        case 'cliente':
            dataTotal = {...data, cliente: {create:{}}}
            usuario = await crearCliente(data)
            break;
        default:
            return res.status(400).json({ error: 'Tipo de usuario inválido' });          
    }
        res.status(201).json({usuario})
    }
    catch (error: any) {
        console.error("Error creando usuario:", error);
        res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }

}