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

export const crearAdministrador = async (data: CrearUsuarioInput) => {
    const usuario = await prisma.usuario.create({data})
    prisma.administrador.create({
        data:{
            id: usuario.id
        }
    })
}


export const crearTecnico = async (data: CrearUsuarioInput) => {
    const usuario = await prisma.usuario.create({data})
    prisma.tecnico.create({
        data:{
            id: usuario.id
        }
    })
}

export const crearCliente = async (data: CrearUsuarioInput) => {
    const usuario = await prisma.usuario.create({data})
    prisma.tecnico.create({
        data:{
            id: usuario.id
        }
    })
}



// OBTENIENDO USUARIOS

export const obtenerUsuarios = async (tipoElegido: TipoUsuario) => {
    switch(tipoElegido) {
        case 'tecnico':
        return await prisma.usuario.findMany({
            // Condicional: Si el campo tecnico no es nulo, entonces es un tecnico
            where:{
                tecnico: {isNot: null}
            },
            // El include nos permite traer los datos especificos del tecnico
            include: { tecnico: true }
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

        return await prisma.usuario.findMany({
            include: {
                tecnico: true,
                administrador: true,
                cliente: true
            }
        })
    }
}