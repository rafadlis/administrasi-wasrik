/*
  Warnings:

  - You are about to drop the column `createAt` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "OrangPribadi" (
    "id" TEXT NOT NULL,
    "NIK" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kode_provinsi" TEXT NOT NULL,
    "kode_kabupaten" TEXT NOT NULL,
    "kode_kecamatan" TEXT NOT NULL,
    "kode_desa_kelurahan" TEXT NOT NULL,
    "RT" TEXT NOT NULL,
    "RW" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "NPWD" TEXT NOT NULL,

    CONSTRAINT "OrangPribadi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badan" (
    "id" TEXT NOT NULL,
    "NIB" TEXT NOT NULL,
    "namaBadan" TEXT NOT NULL,
    "kode_provinsi" TEXT NOT NULL,
    "kode_kabupaten" TEXT NOT NULL,
    "kode_kecamatan" TEXT NOT NULL,
    "kode_desa_kelurahan" TEXT NOT NULL,
    "RT" TEXT NOT NULL,
    "RW" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "NPWPD" TEXT NOT NULL,

    CONSTRAINT "Badan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PengurusBadan" (
    "id" SERIAL NOT NULL,
    "badan_id" TEXT NOT NULL,
    "orang_pribadi_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PengurusBadan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KategoriAkun" (
    "id" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,

    CONSTRAINT "KategoriAkun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisPajak" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "JenisPajak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaganAkun" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT,
    "nama_akun" TEXT NOT NULL,
    "kategori_akun_id" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JurnalDebit" (
    "id" SERIAL NOT NULL,
    "objek_pajak_id" INTEGER NOT NULL,
    "kode_bayar" TEXT NOT NULL,
    "akun_debit_id" TEXT NOT NULL,
    "debit" INTEGER,
    "keterangan" INTEGER,
    "TerbayarAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JurnalDebit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JurnalKredit" (
    "id" SERIAL NOT NULL,
    "jurnal_debit_id" INTEGER NOT NULL,
    "akun_id" TEXT NOT NULL,
    "kredit" INTEGER,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "JurnalKredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjekPajak" (
    "id" SERIAL NOT NULL,
    "badan_id" TEXT,
    "orang_pribadi_id" TEXT,
    "jenis_pajak_id" INTEGER NOT NULL,
    "terhapus" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ObjekPajak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrangPribadi_NIK_key" ON "OrangPribadi"("NIK");

-- CreateIndex
CREATE UNIQUE INDEX "Badan_NIB_key" ON "Badan"("NIB");

-- AddForeignKey
ALTER TABLE "OrangPribadi" ADD CONSTRAINT "OrangPribadi_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode_provinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrangPribadi" ADD CONSTRAINT "OrangPribadi_kode_provinsi_kode_kabupaten_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten") REFERENCES "Kabupaten"("kode_provinsi", "kode_kabupaten") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrangPribadi" ADD CONSTRAINT "OrangPribadi_kode_provinsi_kode_kabupaten_kode_kecamatan_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan") REFERENCES "Kecamatan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrangPribadi" ADD CONSTRAINT "OrangPribadi_kode_provinsi_kode_kabupaten_kode_kecamatan_k_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") REFERENCES "DesaKelurahan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badan" ADD CONSTRAINT "Badan_kode_provinsi_fkey" FOREIGN KEY ("kode_provinsi") REFERENCES "Provinsi"("kode_provinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badan" ADD CONSTRAINT "Badan_kode_provinsi_kode_kabupaten_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten") REFERENCES "Kabupaten"("kode_provinsi", "kode_kabupaten") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badan" ADD CONSTRAINT "Badan_kode_provinsi_kode_kabupaten_kode_kecamatan_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan") REFERENCES "Kecamatan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badan" ADD CONSTRAINT "Badan_kode_provinsi_kode_kabupaten_kode_kecamatan_kode_des_fkey" FOREIGN KEY ("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") REFERENCES "DesaKelurahan"("kode_provinsi", "kode_kabupaten", "kode_kecamatan", "kode_desa_kelurahan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengurusBadan" ADD CONSTRAINT "PengurusBadan_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "Badan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengurusBadan" ADD CONSTRAINT "PengurusBadan_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "OrangPribadi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun" ADD CONSTRAINT "BaganAkun_kategori_akun_id_fkey" FOREIGN KEY ("kategori_akun_id") REFERENCES "KategoriAkun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun" ADD CONSTRAINT "BaganAkun_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "BaganAkun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalDebit" ADD CONSTRAINT "JurnalDebit_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalDebit" ADD CONSTRAINT "JurnalDebit_akun_debit_id_fkey" FOREIGN KEY ("akun_debit_id") REFERENCES "BaganAkun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalKredit" ADD CONSTRAINT "JurnalKredit_jurnal_debit_id_fkey" FOREIGN KEY ("jurnal_debit_id") REFERENCES "JurnalDebit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalKredit" ADD CONSTRAINT "JurnalKredit_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_badan_id_fkey" FOREIGN KEY ("badan_id") REFERENCES "Badan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_orang_pribadi_id_fkey" FOREIGN KEY ("orang_pribadi_id") REFERENCES "OrangPribadi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjekPajak" ADD CONSTRAINT "ObjekPajak_jenis_pajak_id_fkey" FOREIGN KEY ("jenis_pajak_id") REFERENCES "JenisPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
