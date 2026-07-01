import { useState } from "react";
import type { Vehicle } from "../types/vehicle";
import { decodeVin } from "../plugins/vinService.ts";
import { mapVehicle } from "../utils/mapVehicle";
import {useLocalStorage} from "./useLocalStorage.ts";

export function useVinDecoder() {

  const [data, setData] = useLocalStorage<Vehicle | null>(
    "currentVehicle",
    null
  );

  const [history, setHistory] = useLocalStorage<Vehicle[]>(
    "history",
    []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");


  const decode = async (vin: string) => {

    if (data?.vin === vin) {
      setMessage("This VIN is already loaded");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage("");

    try {
      const response = await decodeVin(vin);

      if (!response || response.Results.length === 0) {
        setError("Vehicle not found");
        return;
      }

      const result = response.Results[0];
      const vehicle = mapVehicle(response);

      if (!result.Make && !result.Model && !result.ModelYear) {
        setError(result.ErrorText || "Invalid VIN");
        return;
      }

      if (result.ErrorCode !== "0") {
        setMessage(result.ErrorText);
      } else {
        setMessage(response.Message);
      }

      setData(vehicle);

    } catch (error: unknown) {

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to decode VIN");
      }

    } finally {
      setLoading(false);
    }
  };


  const deleteFromHistory = (vin: string) => {
    setHistory((prev) =>
      prev.filter((v) => v.vin !== vin)
    );
  };


  return {
    data,
    history,
    loading,
    error,
    message,
    decode,
    deleteFromHistory,
  };
}