"use server";

import { db } from "./db";

export async function getDataForSuratSP(id: number) {
  const data = await db.progresPemeriksaan.findUnique({
    where: {
      id: id,
    },
    select: {
      nomor_surat: true,
      tanggal_surat: true,
      KegiatanPemeriksaan: {
        select: {
          NPWPD: true,
          nama_wp: true,
          masa_pajak_awal: true,
          masa_pajak_akhir: true,
          JenisPajak: {
            select: {
              nama: true,
            },
          },
          TimPemeriksaan: {
            select: {
              AnggotaTimPemeriksaan: {
                select: {
                  Pegawai: {
                    select: {
                      nama_lengkap: true,
                      NIP: true,
                      jabatan: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return data;
}

export type DataForSuratSPType = NonNullable<
  Awaited<ReturnType<typeof getDataForSuratSP>>
>;

export async function getDaftarLHP() {
  const data = await db.progresPemeriksaan.findMany({
    where: {
      KategoriProgresPemeriksaan: {
        nama: "LHP",
      },
      file_url: {
        not: null,
      },
    },
    select: {
      id: true,
      nomor_surat: true,
      tanggal_surat: true,
      file_url: true,
      KegiatanPemeriksaan: {
        select: {
          NPWPD: true,
          nama_wp: true,
        },
      },
      KategoriProgresPemeriksaan: {
        select: {
          nama: true,
        },
      },
    },
  });
  return data;
}

export type DaftarLHPType = NonNullable<
  Awaited<ReturnType<typeof getDaftarLHP>>
>;
