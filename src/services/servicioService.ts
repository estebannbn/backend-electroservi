import { PrismaClient, Prisma } from "@prisma/client";
import { ServicioType } from "../schema/servicioSchema";

const prisma = new PrismaClient();

// Trae también los datos de electrodoméstico
export const obtenerServicio = async (clienteId?: number, tecnicoId?: number, id?: number, tecnicoEmail?: string) => {
    const whereClause: any = {};
    if (clienteId) whereClause.clienteId = clienteId;
    if (tecnicoId) {
        whereClause.trabajos = { some: { tecnicoId, fechaHasta: null } };
        whereClause.estado = { notIn: ['REPARADO', 'PAGADO', 'ENTREGADO', 'CANCELADO'] };
    }
    if (id) whereClause.id = id;
    if (tecnicoEmail) {
        whereClause.trabajos = {
            some: {
                tecnico: {
                    usuario: {
                        mail: tecnicoEmail
                    }
                }
            }
        };
    }
    const servicio = await prisma.servicio.findMany({
        where: whereClause,
        include: {
            electrodomestico: true,
            trabajos: {
                include: {
                    tecnico: {
                        include: {
                            usuario: true
                        }
                    }
                }
            },
            itemsMaterial: {
                include: {
                    material: true
                }
            },
            itemsRepuesto: {
                include: {
                    repuesto: true
                }
            }
        }
    });
    return servicio;
}

export const crearServicio = async (data: ServicioType) => {
    let { itemsMaterial, itemsRepuesto, electrodomestico, clienteId, tipoTrabajoId, electrodomesticoId, ...restoDatos } = data;

    let tecnicoId = null;
    const tecnicoDisponible = await prisma.tecnico.findFirst({
        where: { estado: 'DISPONIBLE' }
    });

    if (tecnicoDisponible) {
        tecnicoId = tecnicoDisponible.id;
        await prisma.tecnico.update({
            where: { id: tecnicoId },
            data: { estado: 'OCUPADO' }
        });
    }

    const nuevoServicio = await prisma.servicio.create({
        data: {
            ...restoDatos,
            fechaLlegadaEstimada: restoDatos.fechaLlegadaEstimada,
            cliente: { connect: { id: clienteId } },
            ...(tecnicoId ? {
                trabajos: {
                    create: {
                        tecnicoId: tecnicoId,
                        fechaDesde: new Date()
                    }
                }
            } : {}),
            ...(tipoTrabajoId ? { tipoTrabajo: { connect: { id: tipoTrabajoId } } } : {}),
            electrodomestico: electrodomestico
                ? { create: electrodomestico }
                : { connect: { id: electrodomesticoId! } },
            ...(itemsMaterial && itemsMaterial.length > 0 ? { itemsMaterial: { createMany: { data: itemsMaterial } } } : {}),
            ...(itemsRepuesto && itemsRepuesto.length > 0 ? { itemsRepuesto: { createMany: { data: itemsRepuesto } } } : {})
        },
        include: {
            trabajos: true
        }
    });
    return nuevoServicio;
}

export const finalizarServicio = async (servicioId: number, tecnicoId: number, comentario?: string) => {
    return prisma.$transaction(async (transaction) => {
        const trabajoActivo = await transaction.trabajo.findFirst({
            where: { servicioId, tecnicoId, fechaHasta: null },
            select: { id: true }
        });

        if (!trabajoActivo) {
            return null;
        }

        const fechaFin = new Date();
        await transaction.trabajo.update({
            where: { id: trabajoActivo.id },
            data: { fechaHasta: fechaFin }
        });

        const servicioActualizado = await transaction.servicio.update({
            where: { id: servicioId },
            data: {
                estado: 'REPARADO',
                fechaReparacion: fechaFin,
                fechaFin,
                ...(comentario ? { comentario } : {})
            }
        });

        const trabajosRestantes = await transaction.trabajo.count({
            where: {
                tecnicoId,
                fechaHasta: null,
                servicio: {
                    estado: { notIn: ['REPARADO', 'PAGADO', 'ENTREGADO', 'CANCELADO'] }
                }
            }
        });

        if (trabajosRestantes === 0) {
            await transaction.tecnico.update({
                where: { id: tecnicoId },
                data: { estado: 'DISPONIBLE' }
            });
        }

        return servicioActualizado;
    });
}