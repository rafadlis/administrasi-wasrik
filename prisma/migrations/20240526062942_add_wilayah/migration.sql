/*
  Warnings:

  - The primary key for the `Kabupaten` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode` on the `Kabupaten` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Kabupaten` table. All the data in the column will be lost.
  - The primary key for the `Kecamatan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode` on the `Kecamatan` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Kecamatan` table. All the data in the column will be lost.
  - You are about to drop the `Desa_Kelurahan` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Kabupaten" DROP CONSTRAINT "Kabupaten_pkey",
DROP COLUMN "kode",
DROP COLUMN "nama",
ADD CONSTRAINT "Kabupaten_pkey" PRIMARY KEY ("kode_provinsi", "kode_kabupaten");

-- AlterTable
ALTER TABLE "Kecamatan" DROP CONSTRAINT "Kecamatan_pkey",
DROP COLUMN "kode",
DROP COLUMN "nama",
ADD CONSTRAINT "Kecamatan_pkey" PRIMARY KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan");

-- DropTable
DROP TABLE "Desa_Kelurahan";

-- CreateTable
CREATE TABLE "DesaKelurahan" (
    "kode_provinsi" TEXT NOT NULL,
    "kode_kabupaten" TEXT NOT NULL,
    "kode_kecamatan" TEXT NOT NULL,
    "kode_desa_kelurahan" TEXT NOT NULL,

    CONSTRAINT "DesaKelurahan_pkey" PRIMARY KEY ("kode_provinsi","kode_kabupaten","kode_kecamatan","kode_desa_kelurahan")
);

-- AddForeignKey
ALTER TABLE "Kabupaten" ADD CONSTRAINT "Kabupaten_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kecamatan" ADD CONSTRAINT "Kecamatan_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kecamatan" ADD CONSTRAINT "Kecamatan_kode_provinsi_kode_kabupaten_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten") REFERENCES "Kabupaten"("kode_provinsi", "kode_kabupaten") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesaKelurahan" ADD CONSTRAINT "DesaKelurahan_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesaKelurahan" ADD CONSTRAINT "DesaKelurahan_kode_provinsi_kode_kabupaten_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten") REFERENCES "Kabupaten"("kode_provinsi", "kode_kabupaten") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesaKelurahan" ADD CONSTRAINT "DesaKelurahan_kode_provinsi_kode_kabupaten_kode_kecamatan_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan") REFERENCES "Kecamatan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;
