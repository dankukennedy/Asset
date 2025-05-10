/*
  Warnings:

  - A unique constraint covering the columns `[decoId]` on the table `Decommission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[disposeId]` on the table `Disposal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reportId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "AssetUser_name_idx" ON "AssetUser"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Decommission_decoId_key" ON "Decommission"("decoId");

-- CreateIndex
CREATE UNIQUE INDEX "Disposal_disposeId_key" ON "Disposal"("disposeId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_reportId_key" ON "Report"("reportId");

-- CreateIndex
CREATE INDEX "Rooms_label_idx" ON "Rooms"("label");
