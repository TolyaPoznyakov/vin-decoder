import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import styles from "./VariableItem.module.css";

type VariableItemProps = {
  id: number;
  name: string;
  description: string;
};

function VariableItem({ id, name, description }: VariableItemProps) {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <Link to={`/variables/${id}`} className={styles.variableCard}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <span className={styles.arrow}>→</span>
      </div>

      <div
        className={styles.variableDescription}
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </Link>
  );
}

export default VariableItem;