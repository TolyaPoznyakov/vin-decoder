export interface NhtsaResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: T[];
}

export interface NhtsaVinResult {
  VIN: string;
  Make: string;
  Manufacturer: string;
  Model: string;
  ModelYear: string;
  BodyClass: string;
  VehicleType: string;
  EngineCylinders: string;
  DisplacementL: string;
  FuelTypePrimary: string;
  EngineHP: string;
  DriveType: string;
  BrakeSystemType: string;
  GVWR: string;
  PlantCity: string;
  PlantCountry: string;
  PlantState: string;
  ErrorCode: string;
  ErrorText: string;
}

export interface NhtsaVariable {
  DataType: string;
  Description: string;
  GroupName: string;
  ID: number;
  Name: string;
}