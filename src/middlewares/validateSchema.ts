import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import {UsuarioType} from "../schema/usuarioSchema";

export const validateSchema = (schema: ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validation = await schema.safeParseAsync(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    message: "Error de validación",
                    error: validation.error.issues.map(issue => {
                        return { path: issue.path[0], message: issue.message };
                    })
                });
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Error de validación",
                    error: error.issues.map(issue => {
                        return { path: issue.path[0], message: issue.message };
                    })
                });
            }
            next(error);
        }
    };
};
