import {
  getHasilPemeriksaan,
  getJenisPajak,
  getJenisPemeriksaan,
  getProgressPemeriksaan,
  getTim,
} from "@/lib/get-other";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const type = headersList.get("Content-Type");
  const whatData = headersList.get("What-Data");

  if (type !== "application/json") {
    return Response.json({ message: "Invalid Content-Type" }, { status: 415 });
  }

  if (whatData === "jenisPajak") {
    const data = await getJenisPajak();
    return Response.json({ data });
  }

  if (whatData === "progressPemeriksaan") {
    const data = await getProgressPemeriksaan();
    return Response.json({ data });
  }

  if (whatData === "jenisPemeriksaan") {
    const data = await getJenisPemeriksaan();
    return Response.json({ data });
  }

  if (whatData === "hasilPemeriksaan") {
    const data = await getHasilPemeriksaan();
    return Response.json({ data });
  }

  if (whatData === "tim") {
    const data = await getTim();
    return Response.json({ data });
  }

  if (whatData === "jenisPajak") {
    const data = await getJenisPajak();
    return Response.json({ data });
  }

  return Response.json({ message: "Invalid What-Data" }, { status: 400 });
}
