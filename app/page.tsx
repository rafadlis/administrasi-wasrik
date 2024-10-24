import { NewKegiatanDialog } from "@/components/new-pemeriksaan-form";
import DaftarKegiatanTable from "../components/main-table/table-component";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/table-skeleton";
import { createClient } from "@/lib/supabase/server";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logout } from "@/lib/logout";
import { NewTimDialog } from "@/components/new-tim-dialog";
import { SearchBar } from "@/components/main-table/search-bar";
import { TotalKegiatan } from "@/components/calc/total-kegiatan";
import { FilterYear } from "@/components/filter-year";
import { MonthFilter } from "@/components/filter-month";
import FilterJenisPajak from "@/components/filter-jenis-pajak";

// import ProgressValueCard from "@/components/progress-value-card";
// import { BarChartMultipleCard } from "@/components/bar-chart-multiple";
// import { BarChartMultiple } from "@/components/bar-chart-multiple";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <main className="flex flex-col max-w-screen-xl mx-auto w-full py-3 gap-3">
      <section className="flex flex-row gap-3 print:hidden">
        <form action={Logout}>
          <Button type="submit" variant="outline" size="icon">
            <LogOut className="w-4 h-4" />
          </Button>
        </form>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            Anda login sebagai{" "}
          </span>
          <span className="text-xs">{data?.user?.email}</span>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex flex-row gap-3 items-center print:hidden">
          <SearchBar />
          <div className="flex flex-row gap-2">
            <FilterJenisPajak />
            <MonthFilter />
            <FilterYear />
          </div>
          <TotalKegiatan />
          <div className="flex flex-row justify-end gap-3">
            <NewTimDialog buttonVariant="outline" />
            <NewKegiatanDialog />
          </div>
        </div>
        <Suspense fallback={<TableSkeleton row={10} column={8} />}>
          <h1 className="w-full text-center text-2xl font-bold hidden print:block">
            Pemeriksaan Pajak tahun 2024
          </h1>
          <DaftarKegiatanTable
            search={searchParams.search as string | undefined}
            selectedYear={Number(searchParams.year)}
            selectedMonth={Number(searchParams.month)}
            selectedJenisPajakId={
              searchParams.jenisPajakId as string | undefined
            }
          />
        </Suspense>
      </section>
    </main>
  );
}
