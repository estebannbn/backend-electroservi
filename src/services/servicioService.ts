import { PrismaClient } from "@prisma/client";
import { ServicioType } from "../schema/servicioSchema";

const prisma = new PrismaClient();

export const obtenerServicio = async() => {
    const servicio = await prisma.servicio.findMany();
    return servicio;
}

export const crearServicio = async(data: ServicioType) => {
    const nuevoServicio = await prisma.servicio.create({
        data
    });
    return nuevoServicio;
}