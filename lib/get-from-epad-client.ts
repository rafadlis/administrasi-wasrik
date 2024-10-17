"use client";

import useSWR from "swr";

// MARK: Daftar WP
export function useDaftarWP() {
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: "ABC",
      },
    }).then((res) => res.json());
  const { data, error, isLoading } = useSWR<{ data: DaftarWPType }>(
    "/api/daftar-wp",
    fetcher
  );
  return {
    daftarWP: data?.data || [],
    isLoadingDaftarWP: isLoading,
    errorDaftarWP: error,
  };
}

export type DaftarWPType = {
  ObyekBadanNo: string;
  NamaBadan: string;
  AlamatBadan: string;
}[];

// MARK: Setoran Terdekat
async function getSetoranTerdekatFetcher(
  url: string,
  NPWPD: string | unknown,
  theDate: string | Date | unknown
) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "ABC",
      NPWPD: NPWPD as string,
      theDate: theDate as string,
    },
  });
  const data = await response.json();
  return data;
}

export function GetSetoranTerdekat(
  NPWPD: string | unknown,
  theDate: string | Date
) {
  const { data, error, isLoading } = useSWR<{ data: NearestSetoranType }>(
    ["/api/setoran-terdekat", NPWPD, theDate],
    ([url, NPWPD, theDate]) => getSetoranTerdekatFetcher(url, NPWPD, theDate),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 1000 * 60 * 5,
    }
  );
  return {
    setoranTerdekat: data?.data || [],
    isLoadingNearestSetoran: isLoading,
    errorNearestSetoran: error,
  };
}
export type NearestSetoranType = {
  NamaWajibPajak: string;
  JenisPajak: string;
  NPWPD: string;
  MasaPajak: string;
  TanggalBayar: string;
  Pokok: string;
  NTB: string;
  CaraBayar: string;
}[];

// example:
// const getKodeBayarFetcher = async (
//   url: string,
//   objekPajakId: number | unknown
// ) => {
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       token: `${process.env.NEXT_PUBLIC_API_WP_TOKEN}`,
//       returnData: "basic",
//       hook: "objekPajakId",
//       hookValue: objekPajakId as string,
//     },
//   });
//   const data = await response.json();
//   return data;
// };

// export function GetKodeBayarByObjekPajakId(objekPajakId: number | undefined) {
//   const { data, error, isLoading } = useSWR<{
//     data: DaftarKodeBayarType;
//   }>(["/api/data/kode-bayar", objekPajakId], ([url, objekPajakId]) =>
//     getKodeBayarFetcher(url, objekPajakId)
//   );
//   return {
//     daftarKodeBayar: data?.data ?? [],
//     isErrorFetchingKodeBayar: error,
//     isFetchingKodeBayar: isLoading,
//   };
// }
