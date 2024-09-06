import { columnsPelaksanaan } from "@/components/columns-pelaksanaan";
import { DataTable } from "@/components/data-tables";
import { getDaftarKegiatanPemeriksaan } from "@/lib/get-kegiatan";
import { NewKegiatanDialog } from "@/components/new-kegiatan-form";
export default async function Home() {
  const data = await getDaftarKegiatanPemeriksaan();
  return (
    <main className="w-full py-3">
      <section></section>
      <section className="max-w-screen-xl mx-auto flex flex-col gap-3">
        <NewKegiatanDialog />
        <DataTable columns={columnsPelaksanaan} data={data} />
      </section>
    </main>
  );
}
