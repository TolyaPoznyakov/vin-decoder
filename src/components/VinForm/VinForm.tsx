import { useForm } from "react-hook-form";
import styles from "./VinForm.module.css";

type VinFormProps = {
  onDecode: (vin: string) => void;
};

type FormValues = {
  vin: string;
};

function VinForm({ onDecode }: VinFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const vin = watch("vin", "");

  const onSubmit = (data: FormValues) => {
    onDecode(data.vin.toUpperCase());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${errors.vin ? styles.invalid : ""}`}
          type="text"
          placeholder="Enter 17-character VIN"
          autoComplete="off"
          maxLength={17}
          {...register("vin", {
            required: "VIN is required.",
            minLength: {
              value: 17,
              message: "VIN must contain 17 characters.",
            },
            maxLength: {
              value: 17,
              message: "VIN must contain 17 characters.",
            },
            pattern: {
              value: /^[A-HJ-NPR-Z0-9]+$/,
              message: "VIN contains invalid characters.",
            },
          })}
        />

        <span className={styles.counter}>{vin.length}/17</span>
      </div>

      {errors.vin && (
        <span className={styles.error}>{errors.vin.message}</span>
      )}

      <button className={styles.button} type="submit">
        Decode
      </button>
    </form>
  );
}

export default VinForm;