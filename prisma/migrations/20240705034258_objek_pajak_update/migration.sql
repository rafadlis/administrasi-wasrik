/*
  Warnings:

  - You are about to drop the column `objek_pajak` on the `Badan` table. All the data in the column will be lost.
  - You are about to drop the column `objek_pajak` on the `OrangPribadi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Badan" DROP COLUMN "objek_pajak";

-- AlterTable
ALTER TABLE "OrangPribadi" DROP COLUMN "objek_pajak";
