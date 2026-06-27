import { useState } from "react";
import styles from "./VinForm.module.css";

type VinFormProps = {
  onDecode: (vin: string) => void;
};

function VinForm({ onDecode }: VinFormProps) {
  const [vin, setVin] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVin(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDecode(vin);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/*<label className={styles.label} htmlFor="vin">*/}
      {/*  VIN code*/}
      {/*</label>*/}

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