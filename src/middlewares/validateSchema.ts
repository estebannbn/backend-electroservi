import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError, ZodType } from 'zod';


export const validateSchema = (schema: ZodObject<any> | ZodType<any>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const validation = await schema.safeParseAsync(req.body);
            console.log('validacion:', validation)
            if (!validation.success) {
                res.status(400).json({
                    message: "Error de validación",
                    error: validation.error.issues.map(issue => {
                        return { path: issue.path[0], message: issue.message };
                    })
                });
                return;
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
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
