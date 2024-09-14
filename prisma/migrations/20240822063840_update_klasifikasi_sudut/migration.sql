/*
  Warnings:

  - You are about to drop the column `nama_sudut` on the `KlasifikasiSudut` table. All the data in the column will be lost.
  - Added the required column `nama` to the `KlasifikasiSudut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KlasifikasiSudut" DROP COLUMN "nama_sudut",
ADD COLUMN     "nama" TEXT NOT NULL;
