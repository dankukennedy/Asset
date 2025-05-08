/*
  Warnings:

  - You are about to drop the column `serialNumber` on the `Achieve` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Allocation` table. All the data in the column will be lost.
  - You are about to drop the column `userDepartment` on the `Allocation` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Allocation` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `SystemAudit` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `userTransferTo` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Achieve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetId` to the `Allocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDeptId` to the `Allocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usernameId` to the `Allocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Decommission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Disposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auditId` to the `SystemAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userTransferToId` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achieve" DROP COLUMN "serialNumber",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Allocation" DROP COLUMN "serialNumber",
DROP COLUMN "userDepartment",
DROP COLUMN "username",
ADD COLUMN     "assetId" TEXT NOT NULL,
ADD COLUMN     "userDeptId" TEXT NOT NULL,
ADD COLUMN     "usernameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Decommission" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Disposal" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SystemAudit" DROP COLUMN "serialNumber",
ADD COLUMN     "auditId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "serialNumber",
DROP COLUMN "userTransferTo",
ADD COLUMN     "userTransferToId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_userDeptId_fkey" FOREIGN KEY ("userDeptId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "AssetUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_userTransferToId_fkey" FOREIGN KEY ("userTransferToId") REFERENCES "AssetUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemAudit" ADD CONSTRAINT "SystemAudit_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decommission" ADD CONSTRAINT "Decommission_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposal" ADD CONSTRAINT "Disposal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achieve" ADD CONSTRAINT "Achieve_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
