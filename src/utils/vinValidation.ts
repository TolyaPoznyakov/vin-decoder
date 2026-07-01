import type { NhtsaVinResult } from "../types/api";
import type { Vehicle } from "../types/vehicle";

export function isSuccessfulDecode(result: NhtsaVinResult): boolean {
  return (
    result.ErrorCode === "0" &&
    Boolean(result.Make && result.Model && result.ModelYear)
  );
}

export function isValidVehicle(vehicle: Vehicle): boolean {
  return Boolean(vehicle.vin && vehicle.make && vehicle.model && vehicle.year);
}
