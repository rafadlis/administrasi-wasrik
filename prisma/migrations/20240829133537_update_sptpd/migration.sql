/*
  Warnings:

  - A unique constraint covering the columns `[nomor_surat]` on the table `SPTPD` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SPTPD_nomor_surat_key" ON "SPTPD"("nomor_surat");
