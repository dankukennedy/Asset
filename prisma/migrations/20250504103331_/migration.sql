/*
  Warnings:

  - You are about to drop the column `assetTag` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `assignedTo` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `consumables` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `cpu` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `macAddress` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `ports` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseDate` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `purchasePrice` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `ram` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `resolution` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `warrantyExpiry` on the `Asset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serialNo]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Asset_assetTag_idx";

-- DropIndex
DROP INDEX "Asset_assetTag_key";

-- DropIndex
DROP INDEX "Asset_class_idx";

-- DropIndex
DROP INDEX "Asset_serialNumber_idx";

-- DropIndex
DROP INDEX "Asset_serialNumber_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "assetTag",
DROP COLUMN "assignedTo",
DROP COLUMN "class",
DROP COLUMN "consumables",
DROP COLUMN "cpu",
DROP COLUMN "ipAddress",
DROP COLUMN "location",
DROP COLUMN "macAddress",
DROP COLUMN "manufacturer",
DROP COLUMN "model",
DROP COLUMN "notes",
DROP COLUMN "os",
DROP COLUMN "ports",
DROP COLUMN "purchaseDate",
DROP COLUMN "purchasePrice",
DROP COLUMN "ram",
DROP COLUMN "resolution",
DROP COLUMN "serialNumber",
DROP COLUMN "status",
DROP COLUMN "storage",
DROP COLUMN "warrantyExpiry",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "details" JSONB,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "serialNo" TEXT,
ADD COLUMN     "subType" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Receiving" (
    "id" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receiving_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allocation" (
    "id" TEXT NOT NULL,
    "userDepartment" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Allocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "userTransferTo" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "transferDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemAudit" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decommission" (
    "id" TEXT NOT NULL,
    "dateOfDec" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Decommission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disposal" (
    "id" TEXT NOT NULL,
    "userTransferTo" TEXT NOT NULL,
    "transferDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achieve" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "years" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achieve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_serialNo_key" ON "Asset"("serialNo");
