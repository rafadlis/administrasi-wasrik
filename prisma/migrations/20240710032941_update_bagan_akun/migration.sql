/*
  Warnings:

  - Added the required column `jenis_id` to the `BaganAkun_Objek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_id` to the `BaganAkun_RincianObjek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_id` to the `BaganAkun_SubRincianObjek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BaganAkun_Objek" ADD COLUMN     "jenis_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_RincianObjek" ADD COLUMN     "jenis_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaganAkun_SubRincianObjek" ADD COLUMN     "jenis_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BaganAkun_Jenis" (
    "id" TEXT NOT NULL,
    "akun_id" TEXT NOT NULL,
    "kelompok_id" TEXT NOT NULL,
    "jenis_id" TEXT NOT NULL,
    "uraian_akun" TEXT NOT NULL,

    CONSTRAINT "BaganAkun_Jenis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BaganAkun_Jenis" ADD CONSTRAINT "BaganAkun_Jenis_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "BaganAkun_Akun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Jenis" ADD CONSTRAINT "BaganAkun_Jenis_kelompok_id_fkey" FOREIGN KEY ("kelompok_id") REFERENCES "BaganAkun_Kelompok"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_Objek" ADD CONSTRAINT "BaganAkun_Objek_jenis_id_fkey" FOREIGN KEY ("jenis_id") REFERENCES "BaganAkun_Jenis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_RincianObjek" ADD CONSTRAINT "BaganAkun_RincianObjek_jenis_id_fkey" FOREIGN KEY ("jenis_id") REFERENCES "BaganAkun_Jenis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaganAkun_SubRincianObjek" ADD CONSTRAINT "BaganAkun_SubRincianObjek_jenis_id_fkey" FOREIGN KEY ("jenis_id") REFERENCES "BaganAkun_Jenis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
