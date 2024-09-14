-- CreateTable
CREATE TABLE "Provinsi" (
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Provinsi_pkey" PRIMARY KEY ("kode")
);

-- CreateTable
CREATE TABLE "Kabupaten" (
    "kode_provinsi" TEXT NOT NULL,
    "kode_kabupaten" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Kabupaten_pkey" PRIMARY KEY ("kode")
);

-- CreateTable
CREATE TABLE "Kecamatan" (
    "kode_provinsi" TEXT NOT NULL,
    "kode_kabupaten" TEXT NOT NULL,
    "kode_kecamatan" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Kecamatan_pkey" PRIMARY KEY ("kode")
);

-- CreateTable
CREATE TABLE "Desa_Kelurahan" (
    "kode_provinsi" TEXT NOT NULL,
    "kode_kabupaten" TEXT NOT NULL,
    "kode_kecamatan" TEXT NOT NULL,
    "kode_desa_kelurahan" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Desa_Kelurahan_pkey" PRIMARY KEY ("kode")
);
