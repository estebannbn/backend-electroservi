import { Router } from "express";
import {
    crearUsuarioController,
    editarUsuarioController,
    obtenerUsuariosController
} from "../controllers/usuarioController";
import { validateSchema } from "../middlewares/validateSchema";
import { UsuarioSchema } from "../schema/usuarioSchema";

const router = Router();

router.get('/', obtenerUsuariosController);
router.post('/:tipo', validateSchema(UsuarioSchema), crearUsuarioController);
router.put('/:id', validateSchema(UsuarioSchema), editarUsuarioController);

export default router;