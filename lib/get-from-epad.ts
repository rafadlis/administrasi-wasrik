export async function fetchFromEpad(endpoint: string) {
  const baseUrl = "http://localhost:8080/api";
  const url = `${baseUrl}/${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "ABC",
    },
  });

  return await response.json();
}

export type DaftarWPType = {
  ObyekBadanNo: string;
  NamaBadan: string;
  AlamatBadan: string;
}[];