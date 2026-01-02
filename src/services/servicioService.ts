import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerServicio = async() => {
    const servicio = await prisma.servicio.findMany();
    return servicio;
}