/*
  Warnings:

  - The primary key for the `Provinsi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode` on the `Provinsi` table. All the data in the column will be lost.
  - Added the required column `kode_provinsi` to the `Provinsi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DesaKelurahan" DROP CONSTRAINT "DesaKelurahan_kode_provinsi_fkey";

-- DropForeignKey
ALTER TABLE "Kabupaten" DROP CONSTRAINT "Kabupaten_kode_provinsi_fkey";

-- DropForeignKey
ALTER TABLE "Kecamatan" DROP CONSTRAINT "Kecamatan_kode_provinsi_fkey";

-- AlterTable
ALTER TABLE "Provinsi" DROP CONSTRAINT "Provinsi_pkey",
DROP COLUMN "kode",
ADD COLUMN     "kode_provinsi" TEXT NOT NULL,
ADD CONSTRAINT "Provinsi_pkey" PRIMARY KEY ("kode_provinsi");

-- AddForeignKey
ALTER TABLE "Kabupaten" ADD CONSTRAINT "Kabupaten_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode_provinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kecamatan" ADD CONSTRAINT "Kecamatan_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode_provinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesaKelurahan" ADD CONSTRAINT "DesaKelurahan_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode_provinsi") ON DELETE RESTRICT ON UPDATE CASCADE;
