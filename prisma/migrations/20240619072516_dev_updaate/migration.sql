/*
  Warnings:

  - You are about to drop the column `nomor` on the `SPTPD` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SPTPD" DROP COLUMN "nomor",
ADD COLUMN     "nomor_surat" TEXT;
