import { Router } from "express";
import usuarioRoutes from "./usuario.routes.js";
import electrodomesticoRoutes from "./electrodomestico.routes.js";
import servicioRoutes from "./servicio.routes.js";
import repuestoRoutes from "./repuesto.routes.js";
import materialRoutes from "./material.routes.js";
import trabajoRoutes from "./trabajo.routes.js";
import tipoTrabajoRoutes from "./tipoTrabajo.routes.js";
import pagoRoutes from "./pago.routes.js";
import itemRepuestoRoutes from "./itemrepuesto.routes.js";
import itemMaterialRoutes from "./itemmaterial.routes.js";

const router = Router();

router.use('/usuario', usuarioRoutes);
router.use('/electrodomestico', electrodomesticoRoutes);
router.use('/servicio', servicioRoutes);
router.use('/repuesto', repuestoRoutes);
router.use('/material', materialRoutes);
router.use('/trabajo', trabajoRoutes);
router.use('/tipo-de-trabajo', tipoTrabajoRoutes);
router.use('/pago', pagoRoutes);
router.use('/item-repuesto', itemRepuestoRoutes);
router.use('/item-material', itemMaterialRoutes);

export default router;