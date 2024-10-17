import { View, Text, StyleSheet, Image as ImagePdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "0.3cm",
    borderBottomWidth: 2,
    marginBottom: "0.6cm",
  },
  textContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
});

export default function KopSuratPdf() {
  return (
    <View style={styles.container}>
      <View>
        <ImagePdf
          source={"/logo-bapenda.png"}
          style={{ width: "2.33cm", height: "2.71cm" }}
        />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text>PEMERINTAH KABUPATEN GARUT</Text>
        </View>
        <View>
          <Text
            style={{ fontSize: 16, fontFamily: "Arial", fontWeight: "bold" }}
          >
            BADAN PENDAPATAN DAERAH
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text>
            Jalan Otto Iskandardinata Nomor 278 Garut, Kode Pos: 44151
          </Text>
          <Text>Tlp.(0262) 2801834 Fax. 2801987</Text>
        </View>
      </View>
    </View>
  );
}
