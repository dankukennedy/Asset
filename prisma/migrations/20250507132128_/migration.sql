/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `Allocation` table. All the data in the column will be lost.
  - Added the required column `labelId` to the `Allocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Allocation" DROP COLUMN "roomNumber",
ADD COLUMN     "labelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_label_key" ON "Rooms"("label");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
