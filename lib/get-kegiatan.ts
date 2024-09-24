"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";

export async function getDaftarKegiatanNoRelation() {
  const data = await db.kegiatanPemeriksaan.findMany({});
  return data;
}

export type DaftarKegiatanNoRelationType = NonNullable<
  Awaited<ReturnType<typeof getDaftarKegiatanNoRelation>>
>;

export async function getDaftarKegiatanPemeriksaan(search: string | undefined) {
  const pelaksanaan = await db.kegiatanPemeriksaan.findMany({
    orderBy: [
      {
        masa_pajak_awal: "desc",
      },
      {
        masa_pajak_akhir: "desc",
      },
    ],
    where: {
      OR: [
        {
          nama_wp: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          NPWPD: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          JenisPajak: {
            nama: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          TimPemeriksaan: {
            nama: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    select: {
      id: true,
      nama_wp: true,
      keterangan: true,
      jumlah_kenaikan: true,
      persentase_kenaikan: true,
      estimasi_presentasi_kenaikan: true,
      kategori_hasil_pemeriksaan_id: true,
      JenisPajak: {
        select: {
          id: true,
          nama: true,
        },
      },
      masa_pajak_awal: true,
      masa_pajak_akhir: true,
      NPWPD: true,
      JurnalPemeriksaan: {
        select: {
          id: true,
          nama: true,
          tanggal: true,
          lokasi: true,
          keterangan: true,
          DokumentasiPemeriksaan: {
            select: {
              id: true,
              file_url: true,
            },
          },
        },
      },
      KategoriHasilPemeriksaan: {
        select: {
          id: true,
          keterangan: true,
        },
      },
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
  revalidatePath("/");
  return pelaksanaan;
}

// export type
export type DaftarKegiatanPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getDaftarKegiatanPemeriksaan>>
>;
