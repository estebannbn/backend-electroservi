import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerTipoTrabajo = async() => {
    const tipoTrabajo = await prisma.tipoTrabajo.findMany();
    return tipoTrabajo;
}