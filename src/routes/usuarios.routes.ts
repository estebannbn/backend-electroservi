import { Router } from "express";
import {
    crearUsuarioController,
    editarUsuarioController,
    obtenerUsuariosController
} from "../controllers/usuarioController";

const router = Router();

router.get('/usuarios', obtenerUsuariosController);
router.post('/usuarios/:tipo', crearUsuarioController);
router.put('/usuarios/:id', editarUsuarioController);

export default router;