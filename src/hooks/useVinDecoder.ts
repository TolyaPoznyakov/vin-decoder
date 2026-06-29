import { useState } from "react";
import type { Vehicle } from "../types/vehicle";
import { decodeVin } from "../services/vinService";
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

    if (data?.vin === vin) return;

    setLoading(true);
    setError(null);
    setMessage("");

    try {
      const response = await decodeVin(vin);

      if (!response || response.Results.length === 0) {
        setError("Vehicle not found");
        return;
      }

      setMessage(response.Message);

      const vehicle = mapVehicle(response);

      if (data) {
        setHistory((prev) => {
          const deduped = [
            data,
            ...prev.filter((v) => v.vin !== data.vin),
          ];

          return deduped.slice(0, 3);
        });
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