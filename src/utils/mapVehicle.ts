import type { NhtsaResponse, NhtsaVinResult } from "../types/api";
import type { Vehicle } from "../types/vehicle";


export function mapVehicle(
  response: NhtsaResponse<NhtsaVinResult>
): Vehicle {

  const v = response.Results[0];

  if (!v) {
    throw new Error("No results returned for this VIN");
  }

  return {
    vin: v.VIN,
    make: v.Make || v.Manufacturer || "Unknown",
    model: v.Model,
    year: v.ModelYear,

    bodyClass: v.BodyClass,
    vehicleType: v.VehicleType,

    cylinders: v.EngineCylinders,
    displacement: v.DisplacementL,
    fuelType: v.FuelTypePrimary,
    horsepower: v.EngineHP,

    driveType: v.DriveType,
    brakeSystem: v.BrakeSystemType,
    gvwr: v.GVWR,

    manufacturer: v.Manufacturer,
    plantCity: v.PlantCity,
    plantCountry: v.PlantCountry,
  };
}