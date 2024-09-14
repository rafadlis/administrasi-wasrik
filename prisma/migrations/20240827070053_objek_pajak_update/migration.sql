/*
  Warnings:

  - The primary key for the `WajibPajak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `WajibPajak` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_ObjekPajakToWajibPajak` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `RT` on table `ObjekPajak` required. This step will fail if there are existing NULL values in that column.
  - Made the column `RW` on table `ObjekPajak` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ObjekPajakToWajibPajak" DROP CONSTRAINT "_ObjekPajakToWajibPajak_A_fkey";

-- DropForeignKey
ALTER TABLE "_ObjekPajakToWajibPajak" DROP CONSTRAINT "_ObjekPajakToWajibPajak_B_fkey";

-- AlterTable
ALTER TABLE "ObjekPajak" ALTER COLUMN "RT" SET NOT NULL,
ALTER COLUMN "RW" SET NOT NULL;

-- AlterTable
ALTER TABLE "WajibPajak" DROP CONSTRAINT "WajibPajak_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WajibPajak_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_ObjekPajakToWajibPajak";

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_wajib_pajak_id_fkey" FOREIGN KEY ("wajib_pajak_id") REFERENCES "WajibPajak"("id") ON DELETE SET NULL ON UPDATE CASCADE;
