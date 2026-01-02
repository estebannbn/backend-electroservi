import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerRepuesto = async() => {
    const repuesto = await prisma.repuesto.findMany();
    return repuesto;
}