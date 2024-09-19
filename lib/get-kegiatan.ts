"use server";

import { db } from "./db";

export async function getDaftarKegiatanNoRelation() {
  const data = await db.kegiatanPemeriksaan.findMany({});
  return data;
}

export type DaftarKegiatanNoRelationType = NonNullable<
  Awaited<ReturnType<typeof getDaftarKegiatanNoRelation>>
>;

export async function getDaftarKegiatanPemeriksaan() {
  const pelaksanaan = await db.kegiatanPemeriksaan.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      nama_wp: true,
      keterangan: true,
      jumlah_kenaikan: true,
      persentase_kenaikan: true,
      estimasi_presentasi_kenaikan: true,
      JenisPajak: {
        select: {
          id: true,
          nama: true,
        },
      },
      masa_pajak_awal: true,
      masa_pajak_akhir: true,
      NPWPD: true,
      ProgresPemeriksaan: {
        select: {
          id: true,
          KategoriProgresPemeriksaan: {
            select: {
              id: true,
              nama: true,
            },
          },
          tanggal_surat: true,
          nomor_surat: true,
          keterangan: true,
          createdAt: true,
          updatedAt: true,
          file_url: true,
        },
      },
      KategoriHasilPemeriksaan: {
        select: {
          id: true,
          keterangan: true,
        },
      },

      TimPemeriksaan: {
        select: {
          id: true,
          nama: true,
          AnggotaTimPemeriksaan: {
            select: {
              Pegawai: {
                select: {
                  id: true,
                  panggilan: true,
                  jabatan: true,
                },
              },
            },
          },
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
  return pelaksanaan;
}

// export type
export type DaftarKegiatanPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getDaftarKegiatanPemeriksaan>>
>;
