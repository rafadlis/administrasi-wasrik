/*
  Warnings:

  - A unique constraint covering the columns `[NPWPD]` on the table `WajibPajak` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WajibPajak_NPWPD_key" ON "WajibPajak"("NPWPD");
