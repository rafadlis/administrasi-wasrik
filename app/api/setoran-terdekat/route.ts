import { getSetoranTerdekat } from "@/lib/get-from-epad";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const auth = headersList.get("Authorization");
  const npwpd = headersList.get("NPWPD");
  const theDate = headersList.get("theDate");
  if (!npwpd || !theDate) {
    return Response.json(
      { message: "NPWPD or theDate is required" },
      { status: 400 }
    );
  }
  if (!auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (auth !== "ABC") {
    return Response.json({ message: "Wrong Authorization" }, { status: 401 });
  }
  const data = await getSetoranTerdekat(npwpd, theDate);
  return Response.json({ data });
}
