-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `cuil` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `contraseña` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tecnico` (
    `id` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrador` (
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaPago` DATETIME(3) NOT NULL,
    `monto` DOUBLE NOT NULL,
    `tecnicoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trabajo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaDesde` DATETIME(3) NOT NULL,
    `fechaHasta` DATETIME(3) NULL,
    `tecnicoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,
    `fechaLlegadaEstimada` DATETIME(3) NOT NULL,
    `fechaLlegadaReal` DATETIME(3) NOT NULL,
    `fechaDiagnostico` DATETIME(3) NOT NULL,
    `fechaReparacion` DATETIME(3) NOT NULL,
    `fechaRetiro` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NULL,
    `comentario` VARCHAR(191) NULL,
    `tecnicoId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `tipoReparacionId` INTEGER NOT NULL,
    `electrodomesticoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Electrodomestico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoReparacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `porcentajeTecnico` DOUBLE NOT NULL,
    `porcentajeRepuesto` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemDeMaterial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidadDeMaterial` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,
    `materialId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemDeRepuesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidadDeRepuesto` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,
    `repuestoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Repuesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cantidadActual` INTEGER NOT NULL,
    `cantidadAlerta` INTEGER NOT NULL,
    `precioVentaActual` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrecioRepuesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `precioCompra` DOUBLE NOT NULL,
    `fechaCompra` DATETIME(3) NOT NULL,
    `repuestoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cantidadActual` INTEGER NOT NULL,
    `cantidadAlerta` INTEGER NOT NULL,
    `precioVentaActual` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrecioMaterial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `precioCompraUnidad` DOUBLE NOT NULL,
    `fechaCompra` DATETIME(3) NOT NULL,
    `materialId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tecnico` ADD CONSTRAINT `Tecnico_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `Tecnico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabajo` ADD CONSTRAINT `Trabajo_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `Tecnico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `Tecnico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_tipoReparacionId_fkey` FOREIGN KEY (`tipoReparacionId`) REFERENCES `TipoReparacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_electrodomesticoId_fkey` FOREIGN KEY (`electrodomesticoId`) REFERENCES `Electrodomestico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Electrodomestico` ADD CONSTRAINT `Electrodomestico_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemDeMaterial` ADD CONSTRAINT `ItemDeMaterial_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemDeMaterial` ADD CONSTRAINT `ItemDeMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemDeRepuesto` ADD CONSTRAINT `ItemDeRepuesto_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemDeRepuesto` ADD CONSTRAINT `ItemDeRepuesto_repuestoId_fkey` FOREIGN KEY (`repuestoId`) REFERENCES `Repuesto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioRepuesto` ADD CONSTRAINT `PrecioRepuesto_repuestoId_fkey` FOREIGN KEY (`repuestoId`) REFERENCES `Repuesto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrecioMaterial` ADD CONSTRAINT `PrecioMaterial_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
