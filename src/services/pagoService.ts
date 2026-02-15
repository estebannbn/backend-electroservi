import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const obtenerPago = async() => {
    const pago = await prisma.pago.findMany();
    return pago;
}