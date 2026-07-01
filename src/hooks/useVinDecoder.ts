import { useState } from "react";
import type { Vehicle } from "../types/vehicle";
import { decodeVin } from "../plugins/vinService.ts";
import { mapVehicle } from "../utils/mapVehicle";
import { isSuccessfulDecode, isValidVehicle } from "../utils/vinValidation";
import { useLocalStorage } from "./useLocalStorage.ts";

export function useVinDecoder() {
  const [data, setData] = useLocalStorage<Vehicle | null>(
    "currentVehicle",
    null,
  );

  const [history, setHistory] = useLocalStorage<Vehicle[]>("history", []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const decode = async (vin: string) => {
    const normalizedVin = vin.toUpperCase();

    if (data?.vin === normalizedVin) {
      setMessage("This VIN is already loaded");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage("");

    const rejectDecode = (feedback: { error?: string; message?: string }) => {
      setHistory((prev) => prev.filter((v) => v.vin !== normalizedVin));
      setData(null);
      setError(feedback.error ?? null);
      setMessage(feedback.message ?? "");
    };

    try {
      const response = await decodeVin(normalizedVin);

      if (!response || response.Results.length === 0) {
        rejectDecode({ error: "Vehicle not found" });
        return;
      }

      const result = response.Results[0];

      if (!isSuccessfulDecode(result)) {
        rejectDecode({
          error: result.ErrorText || "Invalid VIN",
        });
        return;
      }

      const vehicle = mapVehicle(response);
      setMessage(response.Message);

      if (data && isValidVehicle(data)) {
        setHistory((prev) => {
          const deduped = [data, ...prev.filter((v) => v.vin !== data.vin)];
          return deduped.slice(0, 3);
        });
      }

      setData(vehicle);
    } catch (error: unknown) {
      rejectDecode({
        error: error instanceof Error ? error.message : "Failed to decode VIN",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteFromHistory = (vin: string) => {
    setHistory((prev) => prev.filter((v) => v.vin !== vin));
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
