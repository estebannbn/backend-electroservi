import { Router } from "express";
import {
    crearUsuarioController,
    editarUsuarioController,
    obtenerUsuariosController, usuarioLogin
} from "../controllers/usuarioController";

const router = Router();

router.get('/', obtenerUsuariosController);
router.post('/:tipo', crearUsuarioController);
router.put('/:id', editarUsuarioController);
router.post('/', usuarioLogin);

export default router;