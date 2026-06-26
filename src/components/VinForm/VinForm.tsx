import { useState } from "react";
import { decodeVin } from "../../services/vinService";
import styles from "./VinForm.module.css";

function VinForm() {
  const [vin, setVin] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVin(event.target.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const data = await decodeVin(vin);

      const filtered = data.Results.filter(
        (item: any) => item.Value
      );

      console.log(filtered);
    } catch (error) {
      console.error("Failed to decode VIN:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="vin">
        VIN code
      </label>

      <input
        className={styles.input}
        id="vin"
        name="vin"
        type="text"
        placeholder="Enter 17-character VIN"
        autoComplete="off"
        value={vin}
        onChange={handleInputChange}
      />

      <button className={styles.button} type="submit">
        Decode
      </button>
    </form>
  );
}

export default VinForm;