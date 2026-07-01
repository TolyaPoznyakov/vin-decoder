import { useState } from "react";
import VinForm from "../components/VinForm/VinForm";
import VinResults from "../components/VinResults/VinResults";
import SearchHistory from "../components/SearchHistory/SearchHistory.tsx";
import { useVinDecoder } from "../hooks/useVinDecoder";
import Loader from "../components/Loader/Loader.tsx";

function Home() {
  const [vinInput, setVinInput] = useState("");

  const {
    data,
    history,
    loading,
    error,
    message,
    decode,
    deleteFromHistory,
  } = useVinDecoder();

  const handleDecode = (vin: string) => {
    decode(vin);
  };

  const handleSelectHistory = (vin: string) => {
    setVinInput(vin);
    decode(vin);
  };


  return (
    <main className="page">
      <VinForm
        onDecode={handleDecode}
        externalVin={vinInput}
        defaultVin={data?.vin}
      />

      {loading && <Loader />}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {message && (
        <p className="message">
          {message}
        </p>
      )}

      {data && (
        <VinResults vehicle={data} />
      )}

      <SearchHistory
        history={history}
        onSelect={handleSelectHistory}
        onDelete={deleteFromHistory}
      />
    </main>
  );
}


export default Home;