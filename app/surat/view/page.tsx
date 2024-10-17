import { getDataForSuratSP } from "@/lib/get-surat";
import { SpPdfViewer } from "./gen-pdf-sp";

export default async function ViewPDF({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = searchParams;

  if (!id) {
    return (
      <article className="h-screen w-full flex justify-center items-center">
        <h1>Data tidak ditemukan</h1>
      </article>
    );
  }

  const data = await getDataForSuratSP(Number(id));
  if (!data) {
    return (
      <article className="h-screen w-full flex justify-center items-center">
        <h1>Data tidak ditemukan</h1>
      </article>
    );
  }
  return (
    <article className="h-screen w-full">
      <SpPdfViewer {...data} />
    </article>
  );
}
