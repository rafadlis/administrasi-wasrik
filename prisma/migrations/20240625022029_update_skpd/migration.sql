/*
  Warnings:

  - The `dasar_pengenaan_pajak` column on the `SKPD` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SKPD" DROP COLUMN "dasar_pengenaan_pajak",
ADD COLUMN     "dasar_pengenaan_pajak" BIGINT;
