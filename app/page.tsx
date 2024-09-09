import { NewKegiatanDialog } from "@/components/new-kegiatan-form";
import DaftarKegiatanTable from "./table";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/table-skeleton";
// import ProgressValueCard from "@/components/progress-value-card";
// import { BarChartMultipleCard } from "@/components/bar-chart-multiple";
// import { BarChartMultiple } from "@/components/bar-chart-multiple";

export default async function Home() {
  return (
    <main className="flex flex-col max-w-screen-xl mx-auto w-full py-3 gap-3">
      <section className="flex flex-row gap-3"></section>
      <section className="flex flex-col gap-3">
        <NewKegiatanDialog className="self-start ml-auto" />
        <Suspense fallback={<TableSkeleton row={10} column={8} />}>
          <DaftarKegiatanTable />
        </Suspense>
      </section>
    </main>
  );
}
