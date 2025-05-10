/*
  Warnings:

  - You are about to drop the `Achieve` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achieve" DROP CONSTRAINT "Achieve_achieveId_fkey";

-- DropForeignKey
ALTER TABLE "Achieve" DROP CONSTRAINT "Achieve_createdById_fkey";

-- DropTable
DROP TABLE "Achieve";

-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "achieveId" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Archive_achieveId_key" ON "Archive"("achieveId");

-- AddForeignKey
ALTER TABLE "Archive" ADD CONSTRAINT "Archive_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archive" ADD CONSTRAINT "Archive_achieveId_fkey" FOREIGN KEY ("achieveId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
