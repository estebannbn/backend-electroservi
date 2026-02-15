import { DecodedToken } from "../Interfaces/usuario";

// Agregamos el campo 'user' al tipo Request de express
declare module 'express' {
    export interface Request {
        user?: DecodedToken
    }
}

