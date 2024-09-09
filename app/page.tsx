import { columnsPelaksanaan } from "@/components/columns-pelaksanaan";
import { DataTable } from "@/components/data-tables";
import { getDaftarKegiatanPemeriksaan } from "@/lib/get-kegiatan";
import { NewKegiatanDialog } from "@/components/new-kegiatan-form";
// import ProgressValueCard from "@/components/progress-value-card";
// import { BarChartMultipleCard } from "@/components/bar-chart-multiple";
// import { BarChartMultiple } from "@/components/bar-chart-multiple";

export default async function Home() {
  const data = await getDaftarKegiatanPemeriksaan();
  return (
    <main className="flex flex-col max-w-screen-xl mx-auto w-full py-3 gap-3">
      <section className="flex flex-row gap-3">
        {/* <BarChartMultipleCard
          title={""}
          description={""}
          chartConfig={undefined}
        /> */}
      </section>
      <section className="flex flex-col gap-3">
        <NewKegiatanDialog className="self-start ml-auto" />
        <DataTable columns={columnsPelaksanaan} data={data} />
      </section>
    </main>
  );
}
