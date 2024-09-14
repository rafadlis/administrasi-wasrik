/*
  Warnings:

  - Added the required column `jenis_pajak_id` to the `SKPD` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SKPD" ADD COLUMN     "jenis_pajak_id" INTEGER NOT NULL,
ADD COLUMN     "kode_bayar_id" TEXT;

-- AddForeignKey
ALTER TABLE "SKPD" ADD CONSTRAINT "SKPD_kode_bayar_id_fkey" FOREIGN KEY ("kode_bayar_id") REFERENCES "KodeBayar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
