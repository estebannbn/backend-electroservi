// Este archivo contiene logica basica para la gestion de usuarios
// Estos servicios seran llamados desde los controladores de los diferentes tipos de usuario

import { PrismaClient, Prisma } from "@prisma/client";
import { UsuarioInput } from "../interfaces";

const prisma = new PrismaClient();

const crearUsuario = (data: UsuarioInput) => {
    prisma.usuario.create({data})
}