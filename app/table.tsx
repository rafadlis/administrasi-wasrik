import { columnsPelaksanaan } from "@/components/columns-pelaksanaan";
import { DataTable } from "@/components/data-tables";
import { getDaftarKegiatanPemeriksaan } from "@/lib/get-kegiatan";

export default async function DaftarKegiatanTable() {
  const data = await getDaftarKegiatanPemeriksaan();
  return <DataTable columns={columnsPelaksanaan} data={data} />;
}
