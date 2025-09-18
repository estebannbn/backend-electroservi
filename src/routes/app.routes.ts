import { Router } from "express";
import { obtenerUsuariosController } from "../controllers/usuarioController";

const router = Router();

router.get('/usuarios/:tipo', obtenerUsuariosController);

export default router;