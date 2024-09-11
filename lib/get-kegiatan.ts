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
      tgl_pemeriksaan_mulai: true,
      tgl_pemeriksaan_selesai: true,
      jenis_pemeriksaan_id: true,
      nama_wp: true,
      NPWPD: true,
      progres_kegiatan: {
        select: {
          id: true,
          kategori_progres: {
            select: {
              id: true,
              nama: true,
            },
          },
        },
      },
      hasil_pemeriksaan: {
        select: {
          id: true,
          keterangan: true,
        },
      },
      jenis_pemeriksaan: {
        select: {
          id: true,
          nama: true,
        },
      },
      tim: {
        select: {
          id: true,
          nama: true,
          anggota_tim: {
            select: {
              petugas: {
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
