/*
  Warnings:

  - The primary key for the `BaganAkun_Akun` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode` on the `BaganAkun_Akun` table. All the data in the column will be lost.
  - You are about to drop the column `kode_akun` on the `BaganAkun_Akun` table. All the data in the column will be lost.
  - The primary key for the `BaganAkun_Kelompok` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kode` on the `BaganAkun_Kelompok` table. All the data in the column will be lost.
  - You are about to drop the column `kode_kelompok` on the `BaganAkun_Kelompok` table. All the data in the column will be lost.
  - The primary key for the `BaganAkun_Objek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jenis_id` on the `BaganAkun_Objek` table. All the data in the column will be lost.
  - You are about to drop the column `kode` on the `BaganAkun_Objek` table. All the data in the column will be lost.
  - You are about to drop the column `kode_objek` on the `BaganAkun_Objek` table. All the data in the column will be lost.
  - The primary key for the `BaganAkun_RincianObjek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jenis_id` on the `BaganAkun_RincianObjek` table. All the data in the column will be lost.
  - You are about to drop the column `kode` on the `BaganAkun_RincianObjek` table. All the data in the column will be lost.
  - You are about to drop the column `kode_rincian_objek` on the `BaganAkun_RincianObjek` table. All the data in the column will be lost.
  - The primary key for the `BaganAkun_SubRincianObjek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jenis_id` on the `BaganAkun_SubRincianObjek` table. All the data in the column will be lost.
  - You are about to drop the column `kode` on the `BaganAkun_SubRincianObjek` table. All the data in the column will be lost.
  - You are about to drop the column `kode_sub_rincian_objek` on the `BaganAkun_SubRincianObjek` table. All the data in the column will be lost.
  - You are about to drop the `BaganAkun_Jenis` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `akun_id` to the `BaganAkun_Akun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelompok_id` to the `BaganAkun_Kelompok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objek_id` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rincian_objek_id` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_rincian_objek_id` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.

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
DROP COLUMN "kode",
DROP COLUMN "kode_akun",
ADD COLUMN     "akun_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BaganAkun_Akun_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BaganAkun_Akun_id_seq";

-- AlterTable
ALTER TABLE "BaganAkun_Kelompok" DROP CONSTRAINT "BaganAkun_Kelompok_pkey",
DROP COLUMN "kode",
DROP COLUMN "kode_kelompok",
ADD COLUMN     "kelompok_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BaganAkun_Kelompok_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BaganAkun_Kelompok_id_seq";

-- AlterTable
ALTER TABLE "BaganAkun_Objek" DROP CONSTRAINT "BaganAkun_Objek_pkey",
DROP COLUMN "jenis_id",
DROP COLUMN "kode",
DROP COLUMN "kode_objek",
ADD COLUMN     "objek_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_id" SET DATA TYPE TEXT,
ALTER COLUMN "kelompok_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BaganAkun_Objek_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BaganAkun_Objek_id_seq";

-- AlterTable
ALTER TABLE "BaganAkun_RincianObjek" DROP CONSTRAINT "BaganAkun_RincianObjek_pkey",
DROP COLUMN "jenis_id",
DROP COLUMN "kode",
DROP COLUMN "kode_rincian_objek",
ADD COLUMN     "rincian_objek_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_id" SET DATA TYPE TEXT,
ALTER COLUMN "kelompok_id" SET DATA TYPE TEXT,
ALTER COLUMN "objek_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BaganAkun_RincianObjek_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BaganAkun_RincianObjek_id_seq";

-- AlterTable
ALTER TABLE "BaganAkun_SubRincianObjek" DROP CONSTRAINT "BaganAkun_SubRincianObjek_pkey",
DROP COLUMN "jenis_id",
DROP COLUMN "kode",
DROP COLUMN "kode_sub_rincian_objek",
ADD COLUMN     "sub_rincian_objek_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_id" SET DATA TYPE TEXT,
ALTER COLUMN "kelompok_id" SET DATA TYPE TEXT,
ALTER COLUMN "objek_id" SET DATA TYPE TEXT,
ALTER COLUMN "rincian_objek_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BaganAkun_SubRincianObjek_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BaganAkun_SubRincianObjek_id_seq";

-- AlterTable
ALTER TABLE "JurnalDebit" ALTER COLUMN "akun_objek_id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_rincian_objek_id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_sub_rincian_objek_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "JurnalKredit" ALTER COLUMN "akun_objek_id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_rincian_objek_id" SET DATA TYPE TEXT,
ALTER COLUMN "akun_sub_rincian_objek_id" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "BaganAkun_Jenis";

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
