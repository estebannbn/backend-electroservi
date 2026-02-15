-- DropForeignKey
ALTER TABLE `trabajo` DROP FOREIGN KEY `Trabajo_tecnicoId_fkey`;

-- DropIndex
DROP INDEX `Trabajo_tecnicoId_fkey` ON `trabajo`;

-- AlterTable
ALTER TABLE `trabajo` MODIFY `tecnicoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Trabajo` ADD CONSTRAINT `Trabajo_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `Tecnico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
