import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerTrabajo = async() => {
    const trabajo = await prisma.trabajo.findMany();
    return trabajo;
}