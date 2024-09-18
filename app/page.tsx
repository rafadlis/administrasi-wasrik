import { NewKegiatanDialog } from "@/components/new-kegiatan-form";
import DaftarKegiatanTable from "./table";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/table-skeleton";
import { createClient } from "@/lib/supabase/server";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logout } from "@/lib/logout";
// import ProgressValueCard from "@/components/progress-value-card";
// import { BarChartMultipleCard } from "@/components/bar-chart-multiple";
// import { BarChartMultiple } from "@/components/bar-chart-multiple";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <main className="flex flex-col max-w-screen-xl mx-auto w-full py-3 gap-3">
      <section className="flex flex-row gap-3">
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
        <NewKegiatanDialog className="self-start ml-auto" />
        <Suspense fallback={<TableSkeleton row={10} column={8} />}>
          <DaftarKegiatanTable />
        </Suspense>
      </section>
    </main>
  );
}
