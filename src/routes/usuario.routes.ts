import { Router } from "express";
import {
    crearUsuarioController,
    editarUsuarioController,
    obtenerUsuariosController, usuarioLogin,
    usuarioLogout, checkSession
} from "../controllers/usuarioController";
import { validateSchema } from "../middlewares/validateSchema";
import { UsuarioSchema, EditarUsuarioSchema } from "../schema/usuarioSchema";
import checkAuthMiddleware from "../middlewares/checkAuthMiddleware";

const router = Router();

router.post('/login', usuarioLogin);
router.post('/logout', usuarioLogout);

// separo las anteriores de las que siguen, porque sino hay conflicto con el :tipo del crearUsuarioController

router.get('/', obtenerUsuariosController);
router.post('/:tipo', (req, res, next) => {
    if (req.params.tipo === 'tecnico') {
        const schema = UsuarioSchema.omit({ contraseña: true });
        validateSchema(schema)(req, res, next);
    } else {
        validateSchema(UsuarioSchema)(req, res, next);
    }
}, crearUsuarioController);

router.put('/:id', validateSchema(EditarUsuarioSchema), editarUsuarioController);

router.get('/auth', checkAuthMiddleware, checkSession); // verificar si el usuario está logueado

export default router;