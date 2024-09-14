-- CreateTable
CREATE TABLE "SPTPD" (
    "id" SERIAL NOT NULL,
    "nomor" TEXT,
    "nomor_urut" TEXT,
    "objek_pajak_id" INTEGER NOT NULL,
    "omzet" TEXT,
    "pajak" TEXT,
    "masa_awal" TIMESTAMP(3),
    "masa_akhir" TIMESTAMP(3),
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SPTPD_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SPTPD" ADD CONSTRAINT "SPTPD_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
