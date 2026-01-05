import { Router } from "express";
import {
    crearUsuarioController,
    editarUsuarioController,
    obtenerUsuariosController
} from "../controllers/usuarioController";

const router = Router();

router.get('/', obtenerUsuariosController);
router.post('/:tipo', crearUsuarioController);
router.put('/:id', editarUsuarioController);

export default router;