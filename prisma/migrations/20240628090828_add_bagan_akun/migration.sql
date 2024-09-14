/*
  Warnings:

  - You are about to drop the column `akun_debit_id` on the `JurnalDebit` table. All the data in the column will be lost.
  - You are about to drop the column `akun_id` on the `JurnalKredit` table. All the data in the column will be lost.
  - You are about to drop the `BaganAkun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KategoriAkun` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `akun_objek_id` to the `JurnalDebit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `akun_objek_id` to the `JurnalKredit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BaganAkun" DROP CONSTRAINT "BaganAkun_kategori_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun" DROP CONSTRAINT "BaganAkun_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalDebit" DROP CONSTRAINT "JurnalDebit_akun_debit_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalKredit" DROP CONSTRAINT "JurnalKredit_akun_id_fkey";

-- AlterTable
ALTER TABLE "JurnalDebit" DROP COLUMN "akun_debit_id",
ADD COLUMN     "akun_objek_id" TEXT NOT NULL,
ADD COLUMN     "akun_rincian_objek_id" TEXT,
ADD COLUMN     "akun_sub_rincian_objek_id" TEXT;

-- AlterTable
ALTER TABLE "JurnalKredit" DROP COLUMN "akun_id",
ADD COLUMN     "akun_objek_id" TEXT NOT NULL,
ADD COLUMN     "akun_rincian_objek_id" TEXT,
ADD COLUMN     "akun_sub_rincian_objek_id" TEXT;

-- DropTable
DROP TABLE "BaganAkun";

-- DropTable
DROP TABLE "KategoriAkun";

-- CreateTable
CREATE TABLE "BaganAkun_All" (
    "id" SERIAL NOT NULL,
    "akun" TEXT,
    "kelompok" TEXT,
    "objek" TEXT,
    "rincian_objek" TEXT,
    "sub_rincian_objek" TEXT,
    "uraian_akun" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_All_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaganAkun_Akun" (
    "id" TEXT NOT NULL,
    "uraian_akun" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_Akun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaganAkun_Kelompok" (
    "id" TEXT NOT NULL,
    "akun_id" TEXT NOT NULL,
    "uraian_akun" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_Kelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaganAkun_Objek" (
    "id" TEXT NOT NULL,
    "akun_id" TEXT NOT NULL,
    "kelompok_id" TEXT NOT NULL,
    "uraian_akun" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_Objek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaganAkun_RincianObjek" (
    "id" TEXT NOT NULL,
    "akun_id" TEXT NOT NULL,
    "kelompok_id" TEXT NOT NULL,
    "objek_id" TEXT NOT NULL,
    "uraian_akun" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_RincianObjek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaganAkun_SubRincianObjek" (
    "id" TEXT NOT NULL,
    "akun_id" TEXT NOT NULL,
    "kelompok_id" TEXT NOT NULL,
    "objek_id" TEXT NOT NULL,
    "rincian_objek_id" TEXT NOT NULL,
    "uraian_akun" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_SubRincianObjek_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BaganAkun_Kelompok" ADD CONSTRAINT "BaganAkun_Kelompok_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Objek" ADD CONSTRAINT "BaganAkun_Objek_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Objek" ADD CONSTRAINT "BaganAkun_Objek_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_objek_id_fkey" FOREIGN KEY ("objek_id") REFERENCES "BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_rincian_objek_id_fkey" FOREIGN KEY ("rincian_objek_id") REFERENCES "BaganAkun_RincianObjek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_objek_id_fkey" FOREIGN KEY ("objek_id") REFERENCES "BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalDebit" ADD CONSTRAINT "JurnalDebit_akun_objek_id_fkey" FOREIGN KEY ("akun_objek_id") REFERENCES "BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalDebit" ADD CONSTRAINT "JurnalDebit_akun_rincian_objek_id_fkey" FOREIGN KEY ("akun_rincian_objek_id") REFERENCES "BaganAkun_RincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalDebit" ADD CONSTRAINT "JurnalDebit_akun_sub_rincian_objek_id_fkey" FOREIGN KEY ("akun_sub_rincian_objek_id") REFERENCES "BaganAkun_SubRincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalKredit" ADD CONSTRAINT "JurnalKredit_akun_objek_id_fkey" FOREIGN KEY ("akun_objek_id") REFERENCES "BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalKredit" ADD CONSTRAINT "JurnalKredit_akun_rincian_objek_id_fkey" FOREIGN KEY ("akun_rincian_objek_id") REFERENCES "BaganAkun_RincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JurnalKredit" ADD CONSTRAINT "JurnalKredit_akun_sub_rincian_objek_id_fkey" FOREIGN KEY ("akun_sub_rincian_objek_id") REFERENCES "BaganAkun_SubRincianObjek"("id") ON DELETE SET NULL ON UPDATE CASCADE;
