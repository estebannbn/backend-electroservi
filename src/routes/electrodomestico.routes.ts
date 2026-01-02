import { Router } from "express";
import { obtenerElectrodomesticoController } from "../controllers/electrodomesticoController.js";


const router = Router();

router.get('/', obtenerElectrodomesticoController);

export default router;