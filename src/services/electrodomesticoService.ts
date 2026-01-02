import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerElectrodomestico = async() => {
    const electrodomestico = await prisma.electrodomestico.findMany();
    return electrodomestico;
}