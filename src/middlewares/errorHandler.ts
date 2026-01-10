/*import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Error de validación",
            errors: err.map((issue:any) => ({
                path: issue.path.join('.'),
                message: issue.message,
            })),
        });
    }

    return res.status(500).json({
        message: "Error interno del servidor",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
}; */