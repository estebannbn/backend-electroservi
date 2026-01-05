/*
  Warnings:

  - Added the required column `tipo` to the `Electrodomestico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `electrodomestico` ADD COLUMN `tipo` ENUM('AIRE_ACONDICIONADO', 'LAVARROPAS', 'HELADERA') NOT NULL;
