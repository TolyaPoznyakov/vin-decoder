import type { Vehicle } from "../../types/vehicle";
import styles from "./VinResults.module.css";

type Props = {
  vehicle: Vehicle;
};

function VinResults({ vehicle }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>
          {vehicle.make} {vehicle.model}
        </h2>
        <span className={styles.year}>{vehicle.year}</span>
      </div>

      <div className={styles.grid}>
        <Section title="General">
          <Item label="Body: " value={vehicle.bodyClass} />
          <Item label="Type: " value={vehicle.vehicleType} />
        </Section>

        <Section title="Engine">
          <Item label="Cylinders: " value={vehicle.cylinders} />
          <Item label="Displacement: " value={`${vehicle.displacement} L`} />
          <Item label="Fuel: " value={vehicle.fuelType} />
          <Item label="Horsepower: " value={vehicle.horsepower} />
        </Section>

        <Section title="Technical">
          <Item label="Drive: " value={vehicle.driveType} />
          <Item label="Brake system: " value={vehicle.brakeSystem} />
          <Item label="GVWR: " value={vehicle.gvwr} />
        </Section>

        <Section title="Manufacturing">
          <Item label="Manufacturer: " value={vehicle.manufacturer} />
          <Item label="Plant: " value={vehicle.plantCity} />
          <Item label="Country: " value={vehicle.plantCountry} />
        </Section>
      </div>
    </div>
  );
}

export default VinResults;

function Section({
                   title,
                   children,
                 }: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.section}>
      <h3>{title}</h3>
      <div className={styles.items}>{children}</div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.item}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value || "—"}</span>
    </div>
  );
}