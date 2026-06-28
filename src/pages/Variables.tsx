import { useEffect, useState } from "react";
import { getVariables } from "../services/variablesService";
import VariablesList from "../components/VariablesList/VariablesList.tsx";

type Variable = {
  ID: number;
  Name: string;
  Description: string;
};

function Variables() {
  const [data, setData] = useState<Variable[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadVariables = async () => {
    try {
      setLoading(true);

      const res = await getVariables();
      setData(res.Results || []);
    } catch {
      setError("Failed to load variables");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadVariables();
    })();
  }, []);

  return (
    <div className="page">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <VariablesList items={data} />
    </div>
  );
}

export default Variables;