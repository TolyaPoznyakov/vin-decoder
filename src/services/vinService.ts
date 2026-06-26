import api from "../api/axios";

export async function decodeVin(vin: string) {
  const { data } = await api.get(
    `/vehicles/DecodeVin/${vin}?format=json`
  );

  return data;
}