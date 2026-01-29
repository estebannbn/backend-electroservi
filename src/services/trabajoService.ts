import { PrismaClient } from "@prisma/client";
import { TrabajoType } from "../schema/trabajoSchema";

const prisma = new PrismaClient();

export const obtenerTrabajo = async() => {
    const trabajo = await prisma.trabajo.findMany();
    return trabajo;
}

export const crearTrabajo = async(data: TrabajoType) => {
    const nuevoTrabajo = await prisma.trabajo.create({
        data
    });
    return nuevoTrabajo;
}