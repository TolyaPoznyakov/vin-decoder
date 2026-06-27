import axios from "axios";

const api = axios.create({
  baseURL: "https://vpic.nhtsa.dot.gov/api",
});

export const decodeVin = async (vin: string) => {
  const { data } = await api.get(
    `/vehicles/DecodeVinValuesExtended/${vin}?format=json`
  );

  return data;
};