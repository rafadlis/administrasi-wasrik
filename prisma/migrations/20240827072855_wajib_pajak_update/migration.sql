/*
  Warnings:

  - You are about to drop the column `badan_id` on the `StatusAktif` table. All the data in the column will be lost.
  - You are about to drop the column `orang_pribadi_id` on the `StatusAktif` table. All the data in the column will be lost.
  - Made the column `wajib_pajak_id` on table `ObjekPajak` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `wajib_pajak_id` to the `StatusAktif` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ObjekPajak" DROP CONSTRAINT "ObjekPajak_wajib_pajak_id_fkey";

-- DropForeignKey
ALTER TABLE "StatusAktif" DROP CONSTRAINT "StatusAktif_badan_id_fkey";

-- DropForeignKey
ALTER TABLE "StatusAktif" DROP CONSTRAINT "StatusAktif_orang_pribadi_id_fkey";

-- DropForeignKey
ALTER TABLE "WajibPajak" DROP CONSTRAINT "WajibPajak_badan_id_fkey";

-- DropForeignKey
ALTER TABLE "WajibPajak" DROP CONSTRAINT "WajibPajak_orang_pribadi_id_fkey";

-- AlterTable
ALTER TABLE "ObjekPajak" ALTER COLUMN "wajib_pajak_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "StatusAktif" DROP COLUMN "badan_id",
DROP COLUMN "orang_pribadi_id",
ADD COLUMN     "wajib_pajak_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WajibPajak" ALTER COLUMN "orang_pribadi_id" DROP NOT NULL,
ALTER COLUMN "badan_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WajibPajak" ADD CONSTRAINT "WajibPajak_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "OrangPribadi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WajibPajak" ADD CONSTRAINT "WajibPajak_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "Badan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_wajib_pajak_id_fkey" FOREIGN KEY ("wajib_pajak_id") REFERENCES "WajibPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusAktif" ADD CONSTRAINT "StatusAktif_wajib_pajak_id_fkey" FOREIGN KEY ("wajib_pajak_id") REFERENCES "WajibPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
