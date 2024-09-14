/*
  Warnings:

  - Added the required column `nama` to the `DesaKelurahan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Kabupaten` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Kecamatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DesaKelurahan" ADD COLUMN     "nama" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Kabupaten" ADD COLUMN     "nama" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Kecamatan" ADD COLUMN     "nama" TEXT NOT NULL;
