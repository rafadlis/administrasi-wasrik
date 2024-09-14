/*
  Warnings:

  - Made the column `surat_id` on table `SPTPD` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SPTPD" DROP CONSTRAINT "SPTPD_surat_id_fkey";

-- AlterTable
ALTER TABLE "SPTPD" ALTER COLUMN "surat_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SPTPD" ADD CONSTRAINT "SPTPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
