import { useEffect, useState } from "react";
import { getVariables } from "../plugins/variablesService.ts";
import VariablesList from "../components/VariablesList/VariablesList.tsx";
import type { Variable } from "../types/variable.ts";
import Loader from "../components/Loader/Loader.tsx";

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
      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <VariablesList items={data} />
    </div>
  );
}

export default Variables;