/*
  Warnings:

  - You are about to drop the column `tipoReparacionId` on the `servicio` table. All the data in the column will be lost.
  - You are about to alter the column `estado` on the `servicio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `estado` on the `tecnico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `tiporeparacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `servicio` DROP FOREIGN KEY `Servicio_tecnicoId_fkey`;

-- DropForeignKey
ALTER TABLE `servicio` DROP FOREIGN KEY `Servicio_tipoReparacionId_fkey`;

-- DropIndex
DROP INDEX `Servicio_tecnicoId_fkey` ON `servicio`;

-- DropIndex
DROP INDEX `Servicio_tipoReparacionId_fkey` ON `servicio`;

-- AlterTable
ALTER TABLE `servicio` DROP COLUMN `tipoReparacionId`,
    ADD COLUMN `tipoTrabajoId` INTEGER NULL,
    MODIFY `estado` ENUM('PENDIENTE', 'EN_REPARACION', 'REPARADO', 'PAGADO', 'ENTREGADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
    MODIFY `fechaLlegadaReal` DATETIME(3) NULL,
    MODIFY `fechaDiagnostico` DATETIME(3) NULL,
    MODIFY `fechaReparacion` DATETIME(3) NULL,
    MODIFY `fechaRetiro` DATETIME(3) NULL,
    MODIFY `tecnicoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `tecnico` MODIFY `estado` ENUM('DISPONIBLE', 'OCUPADO') NOT NULL DEFAULT 'DISPONIBLE';

-- DropTable
DROP TABLE `tiporeparacion`;

-- CreateTable
CREATE TABLE `TipoTrabajo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `porcentajeTecnico` DOUBLE NOT NULL,
    `porcentajeRepuesto` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `Tecnico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_tipoTrabajoId_fkey` FOREIGN KEY (`tipoTrabajoId`) REFERENCES `TipoTrabajo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
