/*
  Warnings:

  - The primary key for the `BaganAkun_Akun` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `akun_id` on the `BaganAkun_Akun` table. All the data in the column will be lost.
  - The `id` column on the `BaganAkun_Akun` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BaganAkun_Jenis` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jenis_id` on the `BaganAkun_Jenis` table. All the data in the column will be lost.
  - The `id` column on the `BaganAkun_Jenis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BaganAkun_Kelompok` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kelompok_id` on the `BaganAkun_Kelompok` table. All the data in the column will be lost.
  - The `id` column on the `BaganAkun_Kelompok` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BaganAkun_Objek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `objek_id` on the `BaganAkun_Objek` table. All the data in the column will be lost.
  - The `id` column on the `BaganAkun_Objek` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BaganAkun_RincianObjek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rincian_objek_id` on the `BaganAkun_RincianObjek` table. All the data in the column will be lost.
  - The `id` column on the `BaganAkun_RincianObjek` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BaganAkun_SubRincianObjek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sub_rincian_objek_id` on the `BaganAkun_SubRincianObjek` table. All the data in the column will be lost.
  - The `id` column on the `BaganAkun_SubRincianObjek` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `akun_rincian_objek_id` column on the `JurnalDebit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `akun_sub_rincian_objek_id` column on the `JurnalDebit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `akun_rincian_objek_id` column on the `JurnalKredit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `akun_sub_rincian_objek_id` column on the `JurnalKredit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `kode` to the `BaganAkun_Akun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_akun` to the `BaganAkun_Akun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode` to the `BaganAkun_Jenis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_jenis` to the `BaganAkun_Jenis` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `akun_id` on the `BaganAkun_Jenis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `kelompok_id` on the `BaganAkun_Jenis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `kode` to the `BaganAkun_Kelompok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kelompok` to the `BaganAkun_Kelompok` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `akun_id` on the `BaganAkun_Kelompok` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `kode` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_objek` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `akun_id` on the `BaganAkun_Objek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `kelompok_id` on the `BaganAkun_Objek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jenis_id` on the `BaganAkun_Objek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `kode` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_rincian_objek` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `akun_id` on the `BaganAkun_RincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `kelompok_id` on the `BaganAkun_RincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `objek_id` on the `BaganAkun_RincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jenis_id` on the `BaganAkun_RincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `kode` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_sub_rincian_objek` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `akun_id` on the `BaganAkun_SubRincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `kelompok_id` on the `BaganAkun_SubRincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `objek_id` on the `BaganAkun_SubRincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rincian_objek_id` on the `BaganAkun_SubRincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jenis_id` on the `BaganAkun_SubRincianObjek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `akun_objek_id` on the `JurnalDebit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `akun_objek_id` on the `JurnalKredit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BaganAkun_Jenis" DROP CONSTRAINT "BaganAkun_Jenis_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_Jenis" DROP CONSTRAINT "BaganAkun_Jenis_kelompok_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_Kelompok" DROP CONSTRAINT "BaganAkun_Kelompok_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_Objek" DROP CONSTRAINT "BaganAkun_Objek_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_Objek" DROP CONSTRAINT "BaganAkun_Objek_jenis_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_Objek" DROP CONSTRAINT "BaganAkun_Objek_kelompok_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_RincianObjek" DROP CONSTRAINT "BaganAkun_RincianObjek_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_RincianObjek" DROP CONSTRAINT "BaganAkun_RincianObjek_jenis_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_RincianObjek" DROP CONSTRAINT "BaganAkun_RincianObjek_kelompok_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_RincianObjek" DROP CONSTRAINT "BaganAkun_RincianObjek_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" DROP CONSTRAINT "BaganAkun_SubRincianObjek_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" DROP CONSTRAINT "BaganAkun_SubRincianObjek_jenis_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" DROP CONSTRAINT "BaganAkun_SubRincianObjek_kelompok_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" DROP CONSTRAINT "BaganAkun_SubRincianObjek_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" DROP CONSTRAINT "BaganAkun_SubRincianObjek_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalDebit" DROP CONSTRAINT "JurnalDebit_akun_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalDebit" DROP CONSTRAINT "JurnalDebit_akun_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalDebit" DROP CONSTRAINT "JurnalDebit_akun_sub_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalKredit" DROP CONSTRAINT "JurnalKredit_akun_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalKredit" DROP CONSTRAINT "JurnalKredit_akun_rincian_objek_id_fkey";

-- DropForeignKey
ALTER TABLE "JurnalKredit" DROP CONSTRAINT "JurnalKredit_akun_sub_rincian_objek_id_fkey";

-- AlterTable
ALTER TABLE "BaganAkun_Akun" DROP CONSTRAINT "BaganAkun_Akun_pkey",
DROP COLUMN "akun_id",
ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "kode_akun" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BaganAkun_Akun_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BaganAkun_Jenis" DROP CONSTRAINT "BaganAkun_Jenis_pkey",
DROP COLUMN "jenis_id",
ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "kode_jenis" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "akun_id",
ADD COLUMN     "akun_id" INTEGER NOT NULL,
DROP COLUMN "kelompok_id",
ADD COLUMN     "kelompok_id" INTEGER NOT NULL,
ADD CONSTRAINT "BaganAkun_Jenis_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BaganAkun_Kelompok" DROP CONSTRAINT "BaganAkun_Kelompok_pkey",
DROP COLUMN "kelompok_id",
ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "kode_kelompok" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "akun_id",
ADD COLUMN     "akun_id" INTEGER NOT NULL,
ADD CONSTRAINT "BaganAkun_Kelompok_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BaganAkun_Objek" DROP CONSTRAINT "BaganAkun_Objek_pkey",
DROP COLUMN "objek_id",
ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "kode_objek" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "akun_id",
ADD COLUMN     "akun_id" INTEGER NOT NULL,
DROP COLUMN "kelompok_id",
ADD COLUMN     "kelompok_id" INTEGER NOT NULL,
DROP COLUMN "jenis_id",
ADD COLUMN     "jenis_id" INTEGER NOT NULL,
ADD CONSTRAINT "BaganAkun_Objek_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BaganAkun_RincianObjek" DROP CONSTRAINT "BaganAkun_RincianObjek_pkey",
DROP COLUMN "rincian_objek_id",
ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "kode_rincian_objek" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "akun_id",
ADD COLUMN     "akun_id" INTEGER NOT NULL,
DROP COLUMN "kelompok_id",
ADD COLUMN     "kelompok_id" INTEGER NOT NULL,
DROP COLUMN "objek_id",
ADD COLUMN     "objek_id" INTEGER NOT NULL,
DROP COLUMN "jenis_id",
ADD COLUMN     "jenis_id" INTEGER NOT NULL,
ADD CONSTRAINT "BaganAkun_RincianObjek_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BaganAkun_SubRincianObjek" DROP CONSTRAINT "BaganAkun_SubRincianObjek_pkey",
DROP COLUMN "sub_rincian_objek_id",
ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "kode_sub_rincian_objek" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "akun_id",
ADD COLUMN     "akun_id" INTEGER NOT NULL,
DROP COLUMN "kelompok_id",
ADD COLUMN     "kelompok_id" INTEGER NOT NULL,
DROP COLUMN "objek_id",
ADD COLUMN     "objek_id" INTEGER NOT NULL,
DROP COLUMN "rincian_objek_id",
ADD COLUMN     "rincian_objek_id" INTEGER NOT NULL,
DROP COLUMN "jenis_id",
ADD COLUMN     "jenis_id" INTEGER NOT NULL,
ADD CONSTRAINT "BaganAkun_SubRincianObjek_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "JurnalDebit" DROP COLUMN "akun_objek_id",
ADD COLUMN     "akun_objek_id" INTEGER NOT NULL,
DROP COLUMN "akun_rincian_objek_id",
ADD COLUMN     "akun_rincian_objek_id" INTEGER,
DROP COLUMN "akun_sub_rincian_objek_id",
ADD COLUMN     "akun_sub_rincian_objek_id" INTEGER;

-- AlterTable
ALTER TABLE "JurnalKredit" DROP COLUMN "akun_objek_id",
ADD COLUMN     "akun_objek_id" INTEGER NOT NULL,
DROP COLUMN "akun_rincian_objek_id",
ADD COLUMN     "akun_rincian_objek_id" INTEGER,
DROP COLUMN "akun_sub_rincian_objek_id",
ADD COLUMN     "akun_sub_rincian_objek_id" INTEGER;

-- AddForeignKey
ALTER TABLE "BaganAkun_Kelompok" ADD CONSTRAINT "BaganAkun_Kelompok_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Jenis" ADD CONSTRAINT "BaganAkun_Jenis_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Jenis" ADD CONSTRAINT "BaganAkun_Jenis_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Objek" ADD CONSTRAINT "BaganAkun_Objek_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Objek" ADD CONSTRAINT "BaganAkun_Objek_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Objek" ADD CONSTRAINT "BaganAkun_Objek_jenis_id_fkey" FOREIGN KEY ("jenis_id") REFERENCES "BaganAkun_Jenis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_objek_id_fkey" FOREIGN KEY ("objek_id") REFERENCES "BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_jenis_id_fkey" FOREIGN KEY ("jenis_id") REFERENCES "BaganAkun_Jenis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_rincian_objek_id_fkey" FOREIGN KEY ("rincian_objek_id") REFERENCES "BaganAkun_RincianObjek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_objek_id_fkey" FOREIGN KEY ("objek_id") REFERENCES "BaganAkun_Objek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_jenis_id_fkey" FOREIGN KEY ("jenis_id") REFERENCES "BaganAkun_Jenis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
