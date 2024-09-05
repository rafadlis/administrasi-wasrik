"use server";

import { db } from "./db";

export async function getDaftarKegiatanPemeriksaan() {
  const pelaksanaan = await db.kegiatanPemeriksaan.findMany();
  return pelaksanaan;
}

// export type
export type DaftarKegiatanPemeriksaanType = NonNullable<
  Awaited<ReturnType<typeof getDaftarKegiatanPemeriksaan>>
>;
