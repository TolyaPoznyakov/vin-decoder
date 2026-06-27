export function mapVehicle(api: any) {
  const v = api.Results[0];

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