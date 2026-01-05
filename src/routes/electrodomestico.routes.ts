import { Router } from "express";
import { crearElectrodomesticoController, obtenerElectrodomesticoController } from "../controllers/electrodomesticoController.js";


const router = Router();

router.get('/', obtenerElectrodomesticoController);
router.post('/', crearElectrodomesticoController);

export default router;