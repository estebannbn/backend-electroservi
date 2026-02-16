import { PrismaClient } from "@prisma/client";
import { PagoType } from "../schema/pagoSchema.js";


const prisma = new PrismaClient();

export const obtenerPago = async() => {
    const pago = await prisma.pago.findMany();
    return pago;
}

export const crearPago = async (data: PagoType) => {
    const nuevoPago = await prisma.pago.create({
        data
    });
    return nuevoPago;
}