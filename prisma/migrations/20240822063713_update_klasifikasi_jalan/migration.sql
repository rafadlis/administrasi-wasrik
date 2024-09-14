/*
  Warnings:

  - You are about to drop the column `nama_jalan` on the `KlasifikasiJalan` table. All the data in the column will be lost.
  - Added the required column `nama` to the `KlasifikasiJalan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KlasifikasiJalan" DROP COLUMN "nama_jalan",
ADD COLUMN     "nama" TEXT NOT NULL;
