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
    select: {
      id: true,
      tgl_pemeriksaan_mulai: true,
      tgl_pemeriksaan_selesai: true,
      jenis_pemeriksaan_id: true,
      nama_wp: true,
      NPWPD: true,
      status: true,
      hasil_pemeriksaan: {
        select: {
          keterangan: true,
        },
      },
      jenis_pemeriksaan: {
        select: {
          nama: true,
        },
      },
      tim: {
        select: {
          nama: true,
          anggota_tim: {
            select: {
              petugas: {
                select: {
                  panggilan: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return pelaksanaan;
}

// export type
export type DaftarKegiatanPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getDaftarKegiatanPemeriksaan>>
>;
