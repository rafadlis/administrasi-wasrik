-- CreateTable
CREATE TABLE "RiwayatSetoran" (
    "id" TEXT NOT NULL,
    "kode_bayar_id" TEXT,
    "referensi_lain" TEXT,
    "nominal" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiwayatSetoran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KodeBayar" ADD CONSTRAINT "KodeBayar_terbayar_id_fkey" FOREIGN KEY ("terbayar_id") REFERENCES "RiwayatSetoran"("id") ON DELETE SET NULL ON UPDATE CASCADE;
