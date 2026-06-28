type VariableItemProps = {
  name: string;
  description: string;
};

function VariableItem({ name, description }: VariableItemProps) {
  return (
    <div className="variable-card">
      <h3>{name}</h3>

      <div
        className="variable-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

export default VariableItem;