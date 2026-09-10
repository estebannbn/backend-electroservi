import { PrismaClient } from "@prisma/client";
import { RepuestoType } from "../schema/repuestoSchema.js";

const prisma = new PrismaClient();

export const obtenerRepuesto = async() => {
    const repuesto = await prisma.repuesto.findMany();
    return repuesto;
}

export const crearRepuesto = async (data: RepuestoType) => {
    try {
        const repuesto = await prisma.repuesto.create({ data });
        return repuesto;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el repuesto");
    }
}

export const editarRepuesto = async (id: number, data: Partial<RepuestoType>) => {
    try {
        const repuesto = await prisma.repuesto.update({
            where: { id },
            data,
        });
        return repuesto;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al editar el repuesto");
    }
}