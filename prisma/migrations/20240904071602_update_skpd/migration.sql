/*
  Warnings:

  - Made the column `surat_id` on table `SKPD` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SKPD" DROP CONSTRAINT "SKPD_surat_id_fkey";

-- AlterTable
ALTER TABLE "SKPD" ALTER COLUMN "surat_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SKPD" ADD CONSTRAINT "SKPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
