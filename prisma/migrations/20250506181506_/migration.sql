/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Department_name_blockId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");
