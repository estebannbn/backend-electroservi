import { Request, Response, NextFunction } from "express";
import { verifyToken } from '../utils/authHandler'

const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token
    if (!token) {
        res.status(401).json({ error: 'No autorizado' });
        return;
    }
    try {
        req.user = verifyToken(token)
        next()
    } catch (error) {
        res.status(401).json({ error: 'No autorizado' });
        return;
    }
}

export default checkAuthMiddleware