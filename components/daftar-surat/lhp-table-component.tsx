import { getDaftarLHP } from "@/lib/get-surat";
import { LHPDataTable } from "./lhp-data-table";
import { columnsDaftarLHP } from "./lhp-columns";

export async function LHPTableComponent() {
  const data = await getDaftarLHP();
  return <LHPDataTable columns={columnsDaftarLHP} data={data} />;
}
