// Este archivo contiene logica basica para la gestion de usuarios
// Estos servicios seran llamados desde los controladores de los diferentes tipos de usuario

import { PrismaClient } from "@prisma/client";
import { TipoUsuario} from "../Interfaces/usuario";
import { UsuarioType } from "../schema/usuarioSchema";

const prisma = new PrismaClient();

// CREANDO USUARIOS

// Primero creamos el usuario, luego, a partir de su id, creamos 
// el tecnico, cliente o administrador

export const crearAdministrador = async (data: UsuarioType) => {
    const usuario = await prisma.usuario.create({data})
    return await prisma.administrador.create({
        data:{
            id: usuario.id
        }
    })
}

export const crearTecnico = async (data: UsuarioType) => {
    const usuario = await prisma.usuario.create({data})
    return await prisma.tecnico.create({
        data:{
            id: usuario.id
        }
    })
}

export const crearCliente = async (data: UsuarioType) => {
    const usuario = await prisma.usuario.create({data})
    return await prisma.cliente.create({
        data:{
            id: usuario.id
        }
    })
}


// EDITANDO USUARIOS
// TODO: el mail debe ser @unique
export const editarUsuario = async(id: number, data: Partial<UsuarioType>)=> {

    return prisma.usuario.update({
        where: {
            id
        },
        data: {
            nombre: data.nombre,
            apellido: data.apellido,
            contraseña: data.contraseña,
            direccion: data.direccion,
            telefono: data.telefono
        }
    })
}


// OBTENIENDO USUARIOS

export const obtenerUsuarios = async(tipoElegido: TipoUsuario) => {
    switch(tipoElegido) {
        case 'tecnico':
        return await prisma.usuario.findMany({
            where:{
                tecnico: {isNot: null}
            },
            include: { tecnico: true}
        })
        case 'administrador':
        return await prisma.usuario.findMany({
            where:{
                administrador: {isNot: null}
            },
            include: {administrador: true}
        })
        case 'cliente':
        return await prisma.usuario.findMany({
            where:{
                cliente: {isNot: null}
            },
            include: { cliente: true }
        })
        default:
        return await prisma.usuario.findMany({
            include: {
                tecnico: true,
                administrador: true,
                cliente: true
            }
        })
    }
}

export const obtenerUsuarioPorId = async(id: number) => {
    return await prisma.usuario.findUnique({where: {id}})
}