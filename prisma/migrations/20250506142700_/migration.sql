/*
  Warnings:

  - A unique constraint covering the columns `[embossCode]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Asset_embossCode_idx" ON "Asset"("embossCode");

-- CreateIndex
CREATE INDEX "Asset_serialNo_idx" ON "Asset"("serialNo");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_embossCode_key" ON "Asset"("embossCode");
