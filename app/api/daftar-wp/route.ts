import { fetchFromEpad } from "@/lib/get-from-epad";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const auth = headersList.get("Authorization");
  if (!auth) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (auth !== "ABC") {
    return Response.json({ message: "Wrong Authorization" }, { status: 401 });
  }
  const data = await fetchFromEpad("daftar-wp");
  return Response.json({ data });
}
