/*
  Warnings:

  - A unique constraint covering the columns `[achieveId]` on the table `Achieve` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Achieve_achieveId_key" ON "Achieve"("achieveId");
