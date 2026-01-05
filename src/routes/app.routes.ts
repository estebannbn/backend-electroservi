import { Router } from "express";
import electrodomesticoRoutes from "./electrodomestico.routes.js";
import servicioRoutes from "./servicio.routes.js";
import repuestoRoutes from "./repuesto.routes.js";
import materialRoutes from "./material.routes.js";
import trabajoRoutes from "./trabajo.routes.js";
import tipoTrabajoRoutes from "./tipoTrabajo.routes.js";
import usuariosRoutes from "./usuarios.routes";


const router = Router();

router.use('/usuarios', usuariosRoutes);
router.use('/electrodomestico', electrodomesticoRoutes);
router.use('/servicio', servicioRoutes);
router.use('/repuesto', repuestoRoutes);
router.use('/material', materialRoutes);
router.use('/trabajo', trabajoRoutes);
router.use('/tipo-de-trabajo', tipoTrabajoRoutes);
export default router;