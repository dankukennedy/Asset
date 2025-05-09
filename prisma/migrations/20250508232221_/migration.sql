/*
  Warnings:

  - Added the required column `createdById` to the `SystemAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `transferDate` on the `Transfer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SystemAudit" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "createdById" TEXT NOT NULL,
DROP COLUMN "transferDate",
ADD COLUMN     "transferDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemAudit" ADD CONSTRAINT "SystemAudit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
