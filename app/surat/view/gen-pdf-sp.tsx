"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import KopSuratPdf from "./kop-surat-pdf";
import { DataForSuratSPType } from "@/lib/get-surat";

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "../fonts/arial.ttf",
      fontWeight: "normal",
    },
    {
      src: "../fonts/arialBold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    fontFamily: "Arial",
    fontSize: 12,
    paddingTop: "1cm",
    paddingBottom: "2.5cm",
    paddingLeft: "3cm",
    paddingRight: "2cm",
  },
  title: {
    fontWeight: "bold",
  },
});

export default function GenSPPDF(props: DataForSuratSPType) {
  return (
    <Document>
      <Page
        size={{ width: 595.28, height: 935.43 }} // F4
        style={styles.page}
      >
        <KopSuratPdf />
        <View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>SURAT PERINTAH PEMERIKSAAN</Text>
            <Text>
              Nomor : {props.nomor_surat || "800.1.11.1/ . . . - BAPENDA"}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ width: 70 }}>Menimbang</Text>
            <Text style={{ width: 10 }}>:</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", marginBottom: 1 }}>
                <Text style={{ width: 20 }}>a.</Text>
                <Text style={{ flex: 1, textAlign: "justify" }}>
                  bahwa berdasarkan ketentuan pasal 42 ayat (1) dan (2)
                  Peraturan Menteri keuangan Nomor 207 tahun 2018 tentang
                  Pedoman Penagihan dan Pemeriksaan Pajak Daerah, pemeriksaan
                  dilakukan atas dasar analisis risiko yang mempertimbangkan
                  perilaku dan kepatuhan Wajib Pajak; dan
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: 20 }}>b.</Text>
                <Text style={{ flex: 1, textAlign: "justify" }}>
                  bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam
                  huruf a, perlu dilakukan pemeriksaan pajak daerah dalam bentuk
                  tindak lanjut dari hasil analisis risiko.
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ width: 70 }}>Dasar</Text>
            <Text style={{ width: 10 }}>:</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", marginBottom: 1 }}>
                <Text style={{ width: 20 }}>1. </Text>
                <Text style={{ flex: 1, textAlign: "justify" }}>
                  Undang-Undang Nomor 1 tahun 2022 tentang Hubungan Keuangan
                  antara Pemerintah Pusat dan Pemerintah Daerah
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 1 }}>
                <Text style={{ width: 20 }}>2. </Text>
                <Text style={{ flex: 1, textAlign: "justify" }}>
                  Peraturan Pemerintah Nomor 35 Tahun 2023 tentang Ketentuan
                  Umum Pajak dan Retribusi Daerah
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ width: 20 }}>3. </Text>
                <Text style={{ flex: 1, textAlign: "justify" }}>
                  Peraturan Menteri Keuangan Nomor 207 tahun 2018 tentang
                  Pedoman Penagihan dan Pemeriksaan Pajak Daerah
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ textAlign: "center", marginBottom: 10 }}>
            Memberi Perintah
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ width: 70 }}>Dasar</Text>
            <Text style={{ width: 10 }}>:</Text>
            <View style={{ flex: 1 }}>
              {props.KegiatanPemeriksaan.TimPemeriksaan?.AnggotaTimPemeriksaan.map(
                (anggota, index) => (
                  <View
                    style={{ flexDirection: "row", marginBottom: 1 }}
                    key={index}
                  >
                    <Text style={{ width: 20 }}>{index + 1}.</Text>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: 50 }}>Nama</Text>
                        <Text style={{ width: 10 }}>:</Text>
                        <Text style={{ flex: 1 }}>
                          {anggota.Pegawai.nama_lengkap
                            .split(",")
                            .map((part, index) =>
                              index === 0
                                ? part.charAt(0).toUpperCase() +
                                  part.slice(1).toLowerCase()
                                : part
                            )
                            .join(",")}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: 50 }}>NIP</Text>
                        <Text style={{ width: 10 }}>:</Text>
                        <Text style={{ flex: 1 }}>{anggota.Pegawai.NIP}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ width: 50 }}>Jabatan</Text>
                        <Text style={{ width: 10 }}>:</Text>
                        <Text style={{ flex: 1 }}>
                          {anggota.Pegawai.jabatan
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ width: 70 }}>Untuk</Text>
            <Text style={{ width: 10 }}>:</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", marginBottom: 1 }}>
                <Text style={{ width: 20 }}>1. </Text>
                <Text style={{ flex: 1, textAlign: "justify" }}>
                  Melakukan Pemeriksaan Pajak Daerah kepada Wajib Pajak dengan
                  nama {props.KegiatanPemeriksaan.nama_wp} dengan NPWPD{" "}
                  {props.KegiatanPemeriksaan.NPWPD || "0000000000000000"} pada
                  masa pajak{" "}
                  {new Date(
                    props.KegiatanPemeriksaan.masa_pajak_awal || new Date()
                  ).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  sampai dengan{" "}
                  {new Date(
                    props.KegiatanPemeriksaan.masa_pajak_akhir || new Date()
                  ).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  sesuai ketentuan yang berlaku; dan
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 1 }}>
                <Text style={{ width: 20 }}>2. </Text>
                <Text style={{ flex: 1, textAlign: "justify" }}>
                  Melaporkan Hasil Pemeriksaan Pajak sesaui dengan ketentuan
                  yang berlaku.
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Text>
              Garut,{" "}
              {new Date(props.tanggal_surat || new Date()).toLocaleDateString(
                "id-ID",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </Text>
            <Text>Kepala Bidang Pengawasan dan Pemeriksaan</Text>
            <Text style={{ fontWeight: "bold" }}>
              {`\n\n\n\n`}
              Drs. H. HENDRA S GUMILANG, MM
            </Text>
            <Text>NIP 19730413199303 1 003</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export function SpPdfViewer(props: DataForSuratSPType) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <PDFViewer width="100%" height="100%">
      <GenSPPDF {...props} />
    </PDFViewer>
  );
}
