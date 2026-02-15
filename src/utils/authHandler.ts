import jwt from "jsonwebtoken";
import { DecodedToken } from "../Interfaces/usuario";

const secret = process.env.SECRET;

if (!secret) {
    throw new Error("No se ha definido la variable de entorno SECRET");
}

export const generateToken = (payload: DecodedToken) => {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): DecodedToken => {
    return jwt.verify(token, secret) as DecodedToken;
};
