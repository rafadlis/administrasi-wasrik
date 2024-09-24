import { columnsPelaksanaan } from "@/components/main-table/columns-pelaksanaan";
import { DataTable } from "@/components/main-table/data-tables";
import { getDaftarKegiatanPemeriksaan } from "@/lib/get-kegiatan";

export default async function DaftarKegiatanTable({
  search,
}: {
  search: string | string[] | undefined;
}) {
  const data = await getDaftarKegiatanPemeriksaan(search as string);
  return <DataTable columns={columnsPelaksanaan} data={data} />;
}
