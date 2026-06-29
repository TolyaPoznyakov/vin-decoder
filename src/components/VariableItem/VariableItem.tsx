import DOMPurify from "dompurify";
import styles from "./VariableItem.module.css";

type VariableItemProps = {
  name: string;
  description: string;
};

function VariableItem({ name, description }: VariableItemProps) {
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div className={styles.variableCard}>
      <h3>{name}</h3>

      <div
        className={styles.variableDescription}
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    </div>
  );
}

export default VariableItem;