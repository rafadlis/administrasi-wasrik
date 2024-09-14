/*
  Warnings:

  - You are about to drop the column `NPWPD` on the `Badan` table. All the data in the column will be lost.
  - You are about to drop the column `badan_id` on the `ObjekPajak` table. All the data in the column will be lost.
  - You are about to drop the column `orang_pribadi_id` on the `ObjekPajak` table. All the data in the column will be lost.
  - You are about to drop the column `NPWPD` on the `OrangPribadi` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ObjekPajak" DROP CONSTRAINT "ObjekPajak_badan_id_fkey";

-- DropForeignKey
ALTER TABLE "ObjekPajak" DROP CONSTRAINT "ObjekPajak_orang_pribadi_id_fkey";

-- AlterTable
ALTER TABLE "Badan" DROP COLUMN "NPWPD";

-- AlterTable
ALTER TABLE "ObjekPajak" DROP COLUMN "badan_id",
DROP COLUMN "orang_pribadi_id",
ADD COLUMN     "wajib_pajak_id" INTEGER;

-- AlterTable
ALTER TABLE "OrangPribadi" DROP COLUMN "NPWPD";

-- CreateTable
CREATE TABLE "WajibPajak" (
    "id" TEXT NOT NULL,
    "orang_pribadi_id" TEXT NOT NULL,
    "badan_id" TEXT NOT NULL,
    "NPWPD" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WajibPajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ObjekPajakToWajibPajak" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ObjekPajakToWajibPajak_AB_unique" ON "_ObjekPajakToWajibPajak"("A", "B");

-- CreateIndex
CREATE INDEX "_ObjekPajakToWajibPajak_B_index" ON "_ObjekPajakToWajibPajak"("B");

-- AddForeignKey
ALTER TABLE "WajibPajak" ADD CONSTRAINT "WajibPajak_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "OrangPribadi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WajibPajak" ADD CONSTRAINT "WajibPajak_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "Badan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjekPajakToWajibPajak" ADD CONSTRAINT "_ObjekPajakToWajibPajak_A_fkey" FOREIGN KEY ("A") REFERENCES "ObjekPajak"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjekPajakToWajibPajak" ADD CONSTRAINT "_ObjekPajakToWajibPajak_B_fkey" FOREIGN KEY ("B") REFERENCES "WajibPajak"("id") ON DELETE CASCADE ON UPDATE CASCADE;
