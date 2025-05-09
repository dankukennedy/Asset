/*
  Warnings:

  - You are about to drop the column `transferDate` on the `Disposal` table. All the data in the column will be lost.
  - Added the required column `disposeDate` to the `Disposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disposal" DROP COLUMN "transferDate",
ADD COLUMN     "disposeDate" TIMESTAMP(3) NOT NULL;
