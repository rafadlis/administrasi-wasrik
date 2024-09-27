import { columnsPelaksanaan } from "@/components/main-table/columns-kegiatan";
import { DataTable } from "@/components/main-table/data-tables";
import { getDaftarKegiatanPemeriksaan } from "@/lib/get-kegiatan";

export default async function DaftarKegiatanTable({
  search,
  selectedYear,
  selectedMonth,
}: {
  search: string | string[] | undefined;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
}) {
  const unsortedData = await getDaftarKegiatanPemeriksaan(search as string);

  const filteredData = unsortedData.filter((item) => {
    const dates = item.ProgresPemeriksaan.map((p) => p.tanggal_surat).filter(
      (date) => date !== null && date !== undefined
    );

    if (dates.length === 0) return true; // Include items with no dates

    const minDate = new Date(
      Math.min(...dates.map((d) => new Date(d).getTime()))
    );

    if (selectedYear && selectedMonth) {
      return (
        minDate.getFullYear() === selectedYear &&
        minDate.getMonth() === selectedMonth - 1
      );
    } else if (selectedYear) {
      return minDate.getFullYear() === selectedYear;
    } else if (selectedMonth) {
      return minDate.getMonth() === selectedMonth - 1;
    }

    return true; // If both selectedYear and selectedMonth are blank, include all
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

    // If A has all blank dates and B doesn't, A should come first
    if (latestDateA === -Infinity && latestDateB !== -Infinity) return -1;
    // If B has all blank dates and A doesn't, B should come first
    if (latestDateB === -Infinity && latestDateA !== -Infinity) return 1;
    // Otherwise, sort in descending order (latest first)
    return latestDateB - latestDateA;
  });
  return <DataTable columns={columnsPelaksanaan} data={data} />;
}
