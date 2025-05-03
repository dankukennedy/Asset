/*
  Warnings:

  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenExp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "tokenExp" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
