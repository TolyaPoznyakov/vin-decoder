import { useState } from "react";
import { useEffect } from "react";
import VinForm from "../components/VinForm/VinForm";
import VinResults from "../components/VinResults/VinResults";
import SearchHistory from "../components/SearchHistory/SearchHistory.tsx";
import type { Vehicle } from "../types/vehicle";
import { decodeVin } from "../services/vinService";
import { mapVehicle } from "../utils/mapVehicle";

function Home() {
  const [data, setData] = useState<Vehicle | null>(() => {
    const saved = localStorage.getItem("currentVehicle");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [vinInput, setVinInput] = useState("");
  const [history, setHistory] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("currentVehicle", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleDecode = async (vin: string) => {
    try {
      if (data?.vin === vin) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setMessage("");

      const response = await decodeVin(vin);

      setMessage(response.Message);

      const vehicle = mapVehicle(response);

      if (data) {
        setHistory((prev) => {
          const updated = [
            data,
            ...prev.filter((item) => item.vin !== data.vin),
          ];

          return updated.slice(0, 3);
        });
      }

      setData(vehicle);
    } catch {
      setError("Failed to decode VIN");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = async (vin: string) => {
    setVinInput(vin);
    handleDecode(vin);
  };

  const handleDeleteHistory = (vin: string) => {
    setHistory((prev) => prev.filter((item) => item.vin !== vin));
  };

  return (
    <main className="page">
      <VinForm onDecode={handleDecode} externalVin={vinInput}/>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {message && <p className="message">{message}</p>}

      {data && <VinResults vehicle={data} />}
      <SearchHistory history={history} onSelect={handleSelectHistory} onDelete={handleDeleteHistory} />

    </main>
  );
}

export default Home;