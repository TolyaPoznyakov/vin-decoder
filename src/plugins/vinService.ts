import api from "./axios.ts";
import type { NhtsaResponse, NhtsaVinResult } from "../types/api.ts";

export const decodeVin = async (vin: string): Promise<NhtsaResponse<NhtsaVinResult>> => {
  const { data } = await api.get<NhtsaResponse<NhtsaVinResult>>(
    `/vehicles/DecodeVinValuesExtended/${vin}?format=json`
  );

  return data;
};