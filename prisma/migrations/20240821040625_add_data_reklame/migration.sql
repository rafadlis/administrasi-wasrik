-- CreateTable
CREATE TABLE "DataReklame" (
    "id" SERIAL NOT NULL,
    "objek_pajak_id" INTEGER NOT NULL,
    "jenis_reklame_id" INTEGER NOT NULL,
    "klasifikasi_ruang_id" INTEGER NOT NULL,
    "klasifikasi_jalan_id" INTEGER NOT NULL,
    "klasifikasi_sudut_id" INTEGER NOT NULL,
    "waktu_penayangan" TIMESTAMP(3) NOT NULL,
    "jangka_waktu_penayangan" TEXT,
    "jumlah" INTEGER NOT NULL,
    "ukuran_media" DOUBLE PRECISION NOT NULL,
    "keterangan_lain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataReklame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisReklame" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "lama_masa" TEXT NOT NULL,
    "harga_dasar_ketinggian" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JenisReklame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KlasifikasiRuang" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "skor_bobot" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KlasifikasiRuang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KlasifikasiJalan" (
    "id" SERIAL NOT NULL,
    "nama_jalan" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "skor_bobot" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KlasifikasiJalan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KlasifikasiSudut" (
    "id" SERIAL NOT NULL,
    "nama_sudut" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "skor_bobot" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KlasifikasiSudut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JenisReklame_parent_id_key" ON "JenisReklame"("parent_id");

-- AddForeignKey
ALTER TABLE "DataReklame" ADD CONSTRAINT "DataReklame_objek_pajak_id_fkey" FOREIGN KEY ("objek_pajak_id") REFERENCES "ObjekPajak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataReklame" ADD CONSTRAINT "DataReklame_jenis_reklame_id_fkey" FOREIGN KEY ("jenis_reklame_id") REFERENCES "JenisReklame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataReklame" ADD CONSTRAINT "DataReklame_klasifikasi_ruang_id_fkey" FOREIGN KEY ("klasifikasi_ruang_id") REFERENCES "KlasifikasiRuang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataReklame" ADD CONSTRAINT "DataReklame_klasifikasi_jalan_id_fkey" FOREIGN KEY ("klasifikasi_jalan_id") REFERENCES "KlasifikasiJalan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataReklame" ADD CONSTRAINT "DataReklame_klasifikasi_sudut_id_fkey" FOREIGN KEY ("klasifikasi_sudut_id") REFERENCES "KlasifikasiSudut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JenisReklame" ADD CONSTRAINT "JenisReklame_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "JenisReklame"("id") ON DELETE SET NULL ON UPDATE CASCADE;
