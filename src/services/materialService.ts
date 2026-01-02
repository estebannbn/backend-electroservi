import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerMaterial = async() => {
    const material = await prisma.material.findMany();
    return material;
}