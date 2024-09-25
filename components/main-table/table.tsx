import { columnsPelaksanaan } from "@/components/main-table/columns-kegiatan";
import { DataTable } from "@/components/main-table/data-tables";
import { getDaftarKegiatanPemeriksaan } from "@/lib/get-kegiatan";

export default async function DaftarKegiatanTable({
  search,
}: {
  search: string | string[] | undefined;
}) {
  const unsortedData = await getDaftarKegiatanPemeriksaan(search as string);
  const data = unsortedData.sort((a, b) => {
    const maxDateA = Math.max(
      ...a.ProgresPemeriksaan.map((p) =>
        p.tanggal_surat ? new Date(p.tanggal_surat).getTime() : 0
      )
    );
    const maxDateB = Math.max(
      ...b.ProgresPemeriksaan.map((p) =>
        p.tanggal_surat ? new Date(p.tanggal_surat).getTime() : 0
      )
    );
    return maxDateB - maxDateA; // Sort in descending order (latest first)
  });
  return <DataTable columns={columnsPelaksanaan} data={data} />;
}
