/*
  Warnings:

  - You are about to drop the column `achieveId` on the `Archive` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[archiveId]` on the table `Archive` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `archiveId` to the `Archive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Archive" DROP CONSTRAINT "Archive_achieveId_fkey";

-- DropIndex
DROP INDEX "Archive_achieveId_key";

-- AlterTable
ALTER TABLE "Archive" DROP COLUMN "achieveId",
ADD COLUMN     "archiveId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Archive_archiveId_key" ON "Archive"("archiveId");

-- AddForeignKey
ALTER TABLE "Archive" ADD CONSTRAINT "Archive_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
