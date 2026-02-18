/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Material` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Material_nombre_key` ON `Material`(`nombre`);
