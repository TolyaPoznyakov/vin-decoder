import { useState } from "react";
import VinForm from "../components/VinForm/VinForm";
import VinResults from "../components/VinResults/VinResults";
import type { Vehicle } from "../types/vehicle";
import { decodeVin } from "../services/vinService";
import { mapVehicle } from "../utils/mapVehicle";

function Home() {
  const [data, setData] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = async (vin: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await decodeVin(vin);

      const vehicle = mapVehicle(response);

      setData(vehicle);
    } catch (e) {
      setError("Failed to decode VIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <h1>Vin-decoder</h1>

      <VinForm onDecode={handleDecode} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && <VinResults vehicle={data} />}
    </main>
  );
}

export default Home;