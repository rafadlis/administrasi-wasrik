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
    const latestDateA = Math.max(
      ...a.ProgresPemeriksaan.map((p) =>
        p.tanggal_surat ? new Date(p.tanggal_surat).getTime() : -Infinity
      )
    );
    const latestDateB = Math.max(
      ...b.ProgresPemeriksaan.map((p) =>
        p.tanggal_surat ? new Date(p.tanggal_surat).getTime() : -Infinity
      )
    );

    // If A has all blank dates and B doesn't, A should come first
    if (latestDateA === -Infinity && latestDateB !== -Infinity) return -1;
    // If B has all blank dates and A doesn't, B should come first
    if (latestDateB === -Infinity && latestDateA !== -Infinity) return 1;
    // Otherwise, sort in descending order (latest first)
    return latestDateB - latestDateA;
  });
  return <DataTable columns={columnsPelaksanaan} data={data} />;
}
