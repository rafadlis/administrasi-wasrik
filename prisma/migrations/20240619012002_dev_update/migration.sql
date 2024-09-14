/*
  Warnings:

  - You are about to drop the column `namaBadan` on the `Badan` table. All the data in the column will be lost.
  - You are about to drop the column `kode_bayar` on the `JurnalDebit` table. All the data in the column will be lost.
  - You are about to drop the column `NPWD` on the `OrangPribadi` table. All the data in the column will be lost.
  - You are about to drop the `wilayah` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nama_badan` to the `Badan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Badan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_bayar_id` to the `JurnalDebit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JurnalKredit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat` to the `ObjekPajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_desa_kelurahan` to the `ObjekPajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kabupaten` to the `ObjekPajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kecamatan` to the `ObjekPajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_provinsi` to the `ObjekPajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OrangPribadi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jabatan` to the `PengurusBadan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ObjekPajak" DROP CONSTRAINT "ObjekPajak_jenis_pajak_id_fkey";

-- AlterTable
ALTER TABLE "Badan" DROP COLUMN "namaBadan",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nama_badan" TEXT NOT NULL,
ADD COLUMN     "nomor_urut" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "NPWPD" DROP NOT NULL;

-- AlterTable
ALTER TABLE "JenisPajak" ADD COLUMN     "nomor_rekening_pendapatan" TEXT,
ADD COLUMN     "periode_masa" TEXT;

-- AlterTable
ALTER TABLE "JurnalDebit" DROP COLUMN "kode_bayar",
ADD COLUMN     "kode_bayar_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JurnalKredit" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ObjekPajak" ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "kode_desa_kelurahan" TEXT NOT NULL,
ADD COLUMN     "kode_kabupaten" TEXT NOT NULL,
ADD COLUMN     "kode_kecamatan" TEXT NOT NULL,
ADD COLUMN     "kode_provinsi" TEXT NOT NULL,
ALTER COLUMN "jenis_pajak_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrangPribadi" DROP COLUMN "NPWD",
ADD COLUMN     "NPWPD" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nomor_urut" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PengurusBadan" ADD COLUMN     "jabatan" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "wilayah";

-- CreateTable
CREATE TABLE "Wilayah" (
    "kode" TEXT NOT NULL,
    "nama" TEXT,

    CONSTRAINT "Wilayah_pkey" PRIMARY KEY ("kode")
);

-- CreateTable
CREATE TABLE "StatusAktif" (
    "id" SERIAL NOT NULL,
    "badan_id" TEXT,
    "orang_pribadi_id" TEXT,
    "nonaktif" TIMESTAMP(3) NOT NULL,
    "aktif_kembali" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "alasan" TEXT NOT NULL,
    "referensi" TEXT,

    CONSTRAINT "StatusAktif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformasiKontak" (
    "id" SERIAL NOT NULL,
    "badan_id" TEXT,
    "orang_pribadi_id" TEXT,
    "email" TEXT NOT NULL,
    "nomor_hp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InformasiKontak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KodeBayar" (
    "id" TEXT NOT NULL,
    "npwpd" TEXT NOT NULL,
    "jenis_pajak_id" INTEGER NOT NULL,
    "masa_awal" TIMESTAMP(3) NOT NULL,
    "masa_akhir" TIMESTAMP(3),
    "nominal" INTEGER NOT NULL,
    "objek_pajak_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kadaluarsa" TIMESTAMP(3) NOT NULL,
    "terbayar" TIMESTAMP(3),
    "nominal_sanksi" INTEGER,
    "terbayar_id" TEXT,

    CONSTRAINT "KodeBayar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatusAktif" ADD CONSTRAINT "StatusAktif_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "Badan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusAktif" ADD CONSTRAINT "StatusAktif_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "OrangPribadi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InformasiKontak" ADD CONSTRAINT "InformasiKontak_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "Badan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InformasiKontak" ADD CONSTRAINT "InformasiKontak_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "OrangPribadi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KodeBayar" ADD CONSTRAINT "KodeBayar_jenis_pajak_id_fkey" FOREIGN KEY ("jenis_pajak_id") REFERENCES "JenisPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KodeBayar" ADD CONSTRAINT "KodeBayar_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalDebit" ADD CONSTRAINT "JurnalDebit_kode_bayar_id_fkey" FOREIGN KEY ("kode_bayar_id") REFERENCES "KodeBayar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_jenis_pajak_id_fkey" FOREIGN KEY ("jenis_pajak_id") REFERENCES "JenisPajak"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode_provinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten") REFERENCES "Kabupaten"("kode_provinsi", "kode_kabupaten") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_kode_kecamatan_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan") REFERENCES "Kecamatan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_kode_provinsi_kode_kabupaten_kode_kecamatan_kod_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") REFERENCES "DesaKelurahan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") ON DELETE RESTRICT ON UPDATE CASCADE;
