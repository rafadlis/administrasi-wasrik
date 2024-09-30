export async function fetchFromEpad(endpoint: string) {
  const baseUrl = "http://192.168.253.15:8080/api";
  const url = `${baseUrl}/${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "ABC",
    },
  });

  return await response.json();
}

export async function getSetoranTerdekat(npwpd: string, theDate: string) {
  const baseUrl = "http://192.168.253.15:8080/api";
  const url = `${baseUrl}/setoran-terdekat`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "ABC",
      NPWPD: npwpd,
      theDate: theDate,
    },
  });
  return await response.json();
}
