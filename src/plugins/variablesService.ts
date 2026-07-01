import api from "./axios.ts";
import type { NhtsaResponse, NhtsaVariable } from "../types/api";

export const getVariables = async (): Promise<NhtsaResponse<NhtsaVariable>> => {
  const { data } = await api.get<NhtsaResponse<NhtsaVariable>>(
    "/vehicles/getvehiclevariablelist?format=json"
  );

  return data;
};

export const getVariableValues = async (id: string) => {
  const { data } = await api.get(
    `/vehicles/GetVehicleVariableValuesList/${id}?format=json`
  );

  return data;
};