/*
  Warnings:

  - The `tokenExp` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "token" DROP NOT NULL,
DROP COLUMN "tokenExp",
ADD COLUMN     "tokenExp" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
