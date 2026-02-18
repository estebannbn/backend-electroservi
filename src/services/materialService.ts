import { PrismaClient } from "@prisma/client";
import { MaterialType } from "../schema/materialSchema.js";

const prisma = new PrismaClient();

export const obtenerMaterial = async () => {
    const material = await prisma.material.findMany();
    return material;
}

export const crearMaterial = async (data: MaterialType) => {
    try {
        const material = await prisma.material.create({ data });
        return material;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el material");
    }
}