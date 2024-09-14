/*
  Warnings:

  - The `omzet` column on the `SPTPD` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pajak` column on the `SPTPD` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ObjekPajak" ADD COLUMN     "nomor_objek_pajak" TEXT;

-- AlterTable
ALTER TABLE "SPTPD" DROP COLUMN "omzet",
ADD COLUMN     "omzet" INTEGER,
DROP COLUMN "pajak",
ADD COLUMN     "pajak" INTEGER;
