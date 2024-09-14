/*
  Warnings:

  - Added the required column `akun_id` to the `BaganAkun_Akun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_id` to the `BaganAkun_Jenis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelompok_id` to the `BaganAkun_Kelompok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objek_id` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rincian_objek_id` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_rincian_objek_id` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BaganAkun_Akun" ADD COLUMN     "akun_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_Jenis" ADD COLUMN     "jenis_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_Kelompok" ADD COLUMN     "kelompok_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_Objek" ADD COLUMN     "objek_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_RincianObjek" ADD COLUMN     "rincian_objek_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_SubRincianObjek" ADD COLUMN     "sub_rincian_objek_id" TEXT NOT NULL;
