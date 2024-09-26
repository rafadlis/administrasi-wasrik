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
        p.tanggal_surat ? new Date(p.tanggal_surat).getTime() : Infinity
      )
    );
    const maxDateB = Math.max(
      ...b.ProgresPemeriksaan.map((p) =>
        p.tanggal_surat ? new Date(p.tanggal_surat).getTime() : Infinity
      )
    );
    // If both have Infinity (blank tanggal_surat), maintain original order
    if (maxDateA === Infinity && maxDateB === Infinity) return 0;
    // If only A has Infinity (blank tanggal_surat), put A first
    if (maxDateA === Infinity) return -1;
    // If only B has Infinity (blank tanggal_surat), put B first
    if (maxDateB === Infinity) return 1;
    // Otherwise, sort in descending order (latest first)
    return maxDateB - maxDateA;
  });
  return <DataTable columns={columnsPelaksanaan} data={data} />;
}
