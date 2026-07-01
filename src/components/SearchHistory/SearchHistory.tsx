import styles from "./SearchHistory.module.css";
import type { Vehicle } from "../../types/vehicle";

type Props = {
  history: Vehicle[];
  onSelect: (vin: string) => void;
  onDelete: (vin: string) => void;
};

function SearchHistory({ history, onSelect, onDelete }: Props) {
  if (history.length === 0) return null;

  return (
    <div className={styles.card}>
      <h2>Recent searches</h2>

      <ul className={styles.list}>
        {history.map((item) => (
          <li
            key={item.vin}
            className={styles.item}
            onClick={() => onSelect(item.vin)}
          >
            <div className={styles.content}>
              <div className={styles.main}>
                {item.make} {item.model}{" "}
                <span className={styles.year}>({item.year})</span>
              </div>

              <div className={styles.vin}>{item.vin}</div>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.vin);
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;