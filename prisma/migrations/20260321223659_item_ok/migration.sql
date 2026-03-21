/*
  Warnings:

  - The primary key for the `itemdematerial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `itemdematerial` table. All the data in the column will be lost.
  - The primary key for the `itemderepuesto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `itemderepuesto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `itemdematerial` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`servicioId`, `materialId`);

-- AlterTable
ALTER TABLE `itemderepuesto` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`servicioId`, `repuestoId`);
