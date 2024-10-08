import useSWR from "swr";
import {
  HasilPemeriksaanType,
  JenisPajakType,
  JenisPemeriksaanType,
  PegawaiType,
  ProgressPemeriksaanType,
  TimType,
} from "./get-other";

const fetcher = (url: string, whatData: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "What-Data": whatData,
    },
  }).then((res) => res.json());
export function useJenisPajak() {
  const { data, error, isLoading } = useSWR<{ data: JenisPajakType }>(
    ["/api/lainnya", "jenisPajak"],
    ([url, whatData]) => fetcher(url, whatData as string)
  );
  return {
    dataJenisPajak: data?.data || [],
    errorJenisPajak: error,
    isLoadingJenisPajak: isLoading,
  };
}

export function useJenisPemeriksaan() {
  const { data, error, isLoading } = useSWR<{ data: JenisPemeriksaanType }>(
    ["/api/lainnya", "jenisPemeriksaan"],
    ([url, whatData]) => fetcher(url, whatData as string)
  );
  return {
    dataJenisPemeriksaan: data?.data || [],
    errorJenisPemeriksaan: error,
    isLoadingJenisPemeriksaan: isLoading,
  };
}

export function useHasilPemeriksaan() {
  const { data, error, isLoading } = useSWR<{ data: HasilPemeriksaanType }>(
    ["/api/lainnya", "hasilPemeriksaan"],
    ([url, whatData]) => fetcher(url, whatData as string)
  );
  return {
    dataHasilPemeriksaan: data?.data || [],
    errorHasilPemeriksaan: error,
    isLoadingHasilPemeriksaan: isLoading,
  };
}

export function useTim() {
  const { data, error, isLoading } = useSWR<{ data: TimType }>(
    ["/api/lainnya", "tim"],
    ([url, whatData]) => fetcher(url, whatData as string)
  );
  return {
    dataTim: data?.data || [],
    errorTim: error,
    isLoadingTim: isLoading,
  };
}

export function useProgressPemeriksaan() {
  const { data, error, isLoading } = useSWR<{ data: ProgressPemeriksaanType }>(
    ["/api/lainnya", "progressPemeriksaan"],
    ([url, whatData]) => fetcher(url, whatData as string)
  );
  return {
    dataProgressPemeriksaan: data?.data || [],
    errorProgressPemeriksaan: error,
    isLoadingProgressPemeriksaan: isLoading,
  };
}

export function usePegawai() {
  const { data, error, isLoading } = useSWR<{ data: PegawaiType }>(
    ["/api/lainnya", "pegawai"],
    ([url, whatData]) => fetcher(url, whatData as string)
  );
  return {
    dataPegawai: data?.data || [],
    errorPegawai: error,
    isLoadingPegawai: isLoading,
  };
}
