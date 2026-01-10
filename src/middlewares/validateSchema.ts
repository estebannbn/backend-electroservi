import { Request, Response, NextFunction } from 'express';
import {ZodObject, ZodError } from 'zod';
import {UsuarioType} from "../schema/usuarioSchema";

export const validateSchema = (schema: ZodObject) => {
    return (req: Request<null,null,UsuarioType>, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Error de validación",
                    error: error.issues.map(issue => {
                        return {path: issue.path[0], message: issue.message}
                    })
                });
            }
            next(error);
        }
    };
};
