/*
  Warnings:

  - You are about to drop the column `akun_id` on the `BaganAkun_Akun` table. All the data in the column will be lost.
  - Added the required column `kode_akun` to the `BaganAkun_Akun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_akun` to the `BaganAkun_Jenis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_jenis` to the `BaganAkun_Jenis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kelompok` to the `BaganAkun_Jenis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_akun` to the `BaganAkun_Kelompok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kelompok` to the `BaganAkun_Kelompok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_akun` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_jenis` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kelompok` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_objek` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_akun` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_jenis` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kelompok` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_objek` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_rincian_objek` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_akun` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_jenis` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_kelompok` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_objek` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_rincian_objek` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_sub_rincian_objek` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BaganAkun_Akun" DROP COLUMN "akun_id",
ADD COLUMN     "kode_akun" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_Jenis" ADD COLUMN     "kode_akun" TEXT NOT NULL,
ADD COLUMN     "kode_jenis" TEXT NOT NULL,
ADD COLUMN     "kode_kelompok" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_Kelompok" ADD COLUMN     "kode_akun" TEXT NOT NULL,
ADD COLUMN     "kode_kelompok" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_Objek" ADD COLUMN     "kode_akun" TEXT NOT NULL,
ADD COLUMN     "kode_jenis" TEXT NOT NULL,
ADD COLUMN     "kode_kelompok" TEXT NOT NULL,
ADD COLUMN     "kode_objek" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_RincianObjek" ADD COLUMN     "kode_akun" TEXT NOT NULL,
ADD COLUMN     "kode_jenis" TEXT NOT NULL,
ADD COLUMN     "kode_kelompok" TEXT NOT NULL,
ADD COLUMN     "kode_objek" TEXT NOT NULL,
ADD COLUMN     "kode_rincian_objek" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_SubRincianObjek" ADD COLUMN     "kode_akun" TEXT NOT NULL,
ADD COLUMN     "kode_jenis" TEXT NOT NULL,
ADD COLUMN     "kode_kelompok" TEXT NOT NULL,
ADD COLUMN     "kode_objek" TEXT NOT NULL,
ADD COLUMN     "kode_rincian_objek" TEXT NOT NULL,
ADD COLUMN     "kode_sub_rincian_objek" TEXT NOT NULL;
