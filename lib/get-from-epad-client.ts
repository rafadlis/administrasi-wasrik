import useSWR from "swr";
import { DaftarWPType } from "./get-from-epad";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: "ABC",
    },
  }).then((res) => res.json());

export function useDaftarWP() {
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
