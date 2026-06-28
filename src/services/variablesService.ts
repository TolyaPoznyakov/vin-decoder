import api from "../api/axios.ts";

export const getVariables = async () => {
  const { data } = await api.get(
    "/vehicles/getvehiclevariablelist?format=json"
  );

  return data;
};