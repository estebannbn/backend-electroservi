/*
  Warnings:

  - You are about to drop the column `codigo` on the `repuesto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Repuesto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `repuesto` DROP COLUMN `codigo`;

-- CreateIndex
CREATE UNIQUE INDEX `Repuesto_nombre_key` ON `Repuesto`(`nombre`);
