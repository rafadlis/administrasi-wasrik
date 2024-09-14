-- CreateTable
CREATE TABLE "SKPD" (
    "id" TEXT NOT NULL,
    "nomor_urut" TEXT,
    "nomor_surat" TEXT,
    "objek_pajak_id" INTEGER NOT NULL,
    "data_pajak" JSONB,
    "dasar_pengenaan_pajak" TEXT,
    "pajak_terhutang" BIGINT,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SKPD_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SKPD" ADD CONSTRAINT "SKPD_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
