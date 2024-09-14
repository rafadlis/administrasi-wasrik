/*
  Warnings:

  - The `surat_id` column on the `SKPD` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `surat_id` column on the `SPTPD` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Surat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Surat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "SKPD" DROP CONSTRAINT "SKPD_surat_id_fkey";

-- DropForeignKey
ALTER TABLE "SPTPD" DROP CONSTRAINT "SPTPD_surat_id_fkey";

-- AlterTable
ALTER TABLE "KodeBayar" ADD COLUMN     "surat_id" INTEGER;

-- AlterTable
ALTER TABLE "SKPD" DROP COLUMN "surat_id",
ADD COLUMN     "surat_id" INTEGER;

-- AlterTable
ALTER TABLE "SPTPD" DROP COLUMN "surat_id",
ADD COLUMN     "surat_id" INTEGER;

-- AlterTable
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Surat_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "KodeBayar" ADD CONSTRAINT "KodeBayar_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "Surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SPTPD" ADD CONSTRAINT "SPTPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "Surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SKPD" ADD CONSTRAINT "SKPD_surat_id_fkey" FOREIGN KEY ("surat_id") REFERENCES "Surat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
