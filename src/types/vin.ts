export interface VinResult {
  Variable: string;
  Value: string;
}

export interface DecodeVinResponse {
  message: string;
  results: VinResult[];
}