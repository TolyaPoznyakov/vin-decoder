import api from "../api/axios.ts";
import type { NhtsaResponse, NhtsaVinResult } from "../types/api";

export const decodeVin = async (vin: string): Promise<NhtsaResponse<NhtsaVinResult>> => {
  const { data } = await api.get<NhtsaResponse<NhtsaVinResult>>(
    `/vehicles/DecodeVinValuesExtended/${vin}?format=json`
  );

  return data;
};