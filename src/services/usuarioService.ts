// Este archivo contiene logica basica para la gestion de usuarios
// Estos servicios seran llamados desde los controladores de los diferentes tipos de usuario

import { PrismaClient, Prisma, Administrador } from "@prisma/client";
import { CrearUsuarioInput, TipoUsuario } from "../interfaces";

const prisma = new PrismaClient();

const crearUsuario = (data: CrearUsuarioInput) => {
    prisma.usuario.create({data})
}


// CREANDO USUARIOS

// Primero creamos el usuario, luego, a partir de su id, creamos 
// el tecnico, cliente o administrador

const crearAdministrador = async (data: CrearUsuarioInput) => {
    const usuario = await prisma.usuario.create({data})
    prisma.administrador.create({
        data:{
            id: usuario.id
        }
    })
}


const crearTecnico = async (data: CrearUsuarioInput) => {
    const usuario = await prisma.usuario.create({data})
    prisma.tecnico.create({
        data:{
            id: usuario.id
        }
    })
}

const crearCliente = async (data: CrearUsuarioInput) => {
    const usuario = await prisma.usuario.create({data})
    prisma.tecnico.create({
        data:{
            id: usuario.id
        }
    })
}



// OBTENIENDO USUARIOS

export const obtenerUsuarios = async(tipoElegido: TipoUsuario | 'todos') => {
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
        case 'todos':
        return await prisma.usuario.findMany({
            where:{
                cliente: {isNot: null}
            },
            include: {
                tecnico: true,
                administrador: true,
                cliente: true
            }
        })
    }
}