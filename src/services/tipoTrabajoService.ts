import { PrismaClient } from "@prisma/client";
import { TipoTrabajoType } from "../schema/tipoTrabajoSchema";

const prisma = new PrismaClient();

export const obtenerTipoTrabajo = async() => {
    const tipoTrabajo = await prisma.tipoTrabajo.findMany();
    return tipoTrabajo;
}

export const crearTipoTrabajo = async(data: TipoTrabajoType) => {
    const tipoTrabajo = await prisma.tipoTrabajo.create({
        data
    });
    return tipoTrabajo;
}
