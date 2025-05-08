/*
  Warnings:

  - You are about to drop the `AssetUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Allocation" DROP CONSTRAINT "Allocation_usernameId_fkey";

-- DropForeignKey
ALTER TABLE "AssetUsers" DROP CONSTRAINT "AssetUsers_userDeptId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_userTransferToId_fkey";

-- DropTable
DROP TABLE "AssetUsers";

-- CreateTable
CREATE TABLE "AssetUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userDeptId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssetUser_name_key" ON "AssetUser"("name");

-- AddForeignKey
ALTER TABLE "AssetUser" ADD CONSTRAINT "AssetUser_userDeptId_fkey" FOREIGN KEY ("userDeptId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES "AssetUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_userTransferToId_fkey" FOREIGN KEY ("userTransferToId") REFERENCES "AssetUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
