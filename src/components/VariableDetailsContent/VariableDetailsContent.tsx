import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import {
  getVariables,
  getVariableValues,
} from "../../plugins/variablesService";
import styles from "./VariableDetailsContent.module.css";
import type { VariableValue } from "../../types/variable";
import DOMPurify from "dompurify";
import BackButton from "../BackButton/BackButton";

function VariableDetailsContent() {
  const { variableId } = useParams();

  const [variable, setVariable] = useState<any>(null);
  const [values, setValues] = useState<VariableValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!variableId) return;

      try {
        setLoading(true);
        setError("");

        const variablesRes = await getVariables();

        const found = variablesRes.Results.find(
          (v: any) => String(v.ID) === String(variableId)
        );

        setVariable(found || null);

        const valuesRes = await getVariableValues(variableId);
        setValues(valuesRes.Results || []);
      } catch {
        setError("Failed to load variable details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [variableId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <BackButton />
        <h2 className={styles.title}>Variable Details</h2>
      </div>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          {variable && (
            <div className={styles.infoCard}>
              <h3 className={styles.name}>{variable.Name}</h3>

              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(variable.Description || ""),
                }}
              />

              <span className={styles.id}>ID: {variable.ID}</span>
            </div>
          )}

          <h3 className={styles.subtitle}>Possible Values</h3>

          {values.length === 0 ? (
            <p className={styles.empty}>No values found</p>
          ) : (
            <table className={styles.table}>
              <thead>
              <tr>
                <th>Value</th>
                <th>Description</th>
              </tr>
              </thead>

              <tbody>
              {values.map((item, index) => (
                <tr key={index}>
                  <td>{item.Id}</td>
                  <td>{item.Name}</td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default VariableDetailsContent;