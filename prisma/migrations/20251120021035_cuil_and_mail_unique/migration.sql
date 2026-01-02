/*
  Warnings:

  - A unique constraint covering the columns `[cuil]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mail]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_cuil_key` ON `Usuario`(`cuil`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_mail_key` ON `Usuario`(`mail`);
