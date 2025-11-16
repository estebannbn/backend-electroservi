import { Router } from "express";
import {crearUsuarioController, obtenerUsuariosController} from "../controllers/usuarioController";

const router = Router();

router.get('/usuarios/:tipo', obtenerUsuariosController);
router.post('/usuarios/:tipo', crearUsuarioController);

export default router;