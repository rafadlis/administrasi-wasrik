/*
  Warnings:

  - You are about to drop the column `jenis_id` on the `BaganAkun_Jenis` table. All the data in the column will be lost.
  - You are about to drop the column `kelompok_id` on the `BaganAkun_Kelompok` table. All the data in the column will be lost.
  - You are about to drop the column `objek_id` on the `BaganAkun_Objek` table. All the data in the column will be lost.
  - You are about to drop the column `rincian_objek_id` on the `BaganAkun_RincianObjek` table. All the data in the column will be lost.
  - You are about to drop the column `sub_rincian_objek_id` on the `BaganAkun_SubRincianObjek` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BaganAkun_Jenis" DROP COLUMN "jenis_id";

-- AlterTable
ALTER TABLE "BaganAkun_Kelompok" DROP COLUMN "kelompok_id";

-- AlterTable
ALTER TABLE "BaganAkun_Objek" DROP COLUMN "objek_id";

-- AlterTable
ALTER TABLE "BaganAkun_RincianObjek" DROP COLUMN "rincian_objek_id";

-- AlterTable
ALTER TABLE "BaganAkun_SubRincianObjek" DROP COLUMN "sub_rincian_objek_id";
