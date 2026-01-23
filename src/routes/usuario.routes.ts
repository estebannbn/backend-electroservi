import { Router } from "express";
import {
    crearUsuarioController,
    editarUsuarioController,
    obtenerUsuariosController, usuarioLogin
} from "../controllers/usuarioController";
import { validateSchema } from "../middlewares/validateSchema";
import { UsuarioSchema } from "../schema/usuarioSchema";

const router = Router();

router.get('/', obtenerUsuariosController);
router.post('/:tipo', validateSchema(UsuarioSchema), crearUsuarioController);
router.put('/:id', validateSchema(UsuarioSchema), editarUsuarioController);
router.post('/', usuarioLogin);

export default router;