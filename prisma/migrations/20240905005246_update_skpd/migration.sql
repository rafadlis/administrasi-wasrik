/*
  Warnings:

  - You are about to drop the column `data_pajak` on the `SKPD` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ObjekPajak" ADD COLUMN     "koordinat" TEXT;

-- AlterTable
ALTER TABLE "SKPD" DROP COLUMN "data_pajak";
