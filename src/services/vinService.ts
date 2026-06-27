import api from "../api/axios.ts";

export const decodeVin = async (vin: string) => {
  const { data } = await api.get(
    `/vehicles/DecodeVinValuesExtended/${vin}?format=json`
  );

  return data;
};