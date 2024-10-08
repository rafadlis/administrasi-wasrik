import { columnsPelaksanaan } from "@/components/main-table/columns-kegiatan";
import { DataTable } from "@/components/main-table/data-tables";
import { getDaftarKegiatanPemeriksaan } from "@/lib/get-kegiatan";

export default async function DaftarKegiatanTable({
  search,
  selectedYear,
  selectedMonth,
  selectedJenisPajakId,
}: {
  search: string | undefined;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
  selectedJenisPajakId: string | undefined;
}) {
  const unsortedData = await getDaftarKegiatanPemeriksaan(search);

  const filteredData = unsortedData.filter((item) => {
    const dates = item.ProgresPemeriksaan.map((p) => p.tanggal_surat).filter(
      Boolean
    );
    const minDate =
      dates.length > 0
        ? new Date(
            Math.min(
              ...dates.map((d) =>
                d ? new Date(d).getTime() : Number.MAX_SAFE_INTEGER
              )
            )
          )
        : null;

    const yearMatch =
      !selectedYear || (minDate && minDate.getFullYear() === selectedYear);
    const monthMatch =
      !selectedMonth || (minDate && minDate.getMonth() === selectedMonth - 1);
    const jenisPajakMatch =
      !selectedJenisPajakId ||
      item.JenisPajak?.id?.toString() === selectedJenisPajakId;

    return yearMatch && monthMatch && jenisPajakMatch;
  });

  const data = filteredData.sort((a, b) => {
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
    return latestDateB - latestDateA;
  });

  return <DataTable columns={columnsPelaksanaan} data={data} />;
}
