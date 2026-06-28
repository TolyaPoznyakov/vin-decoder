import VariableItem from "../VariableItem/VariableItem";

type Variable = {
  ID: number;
  Name: string;
  Description: string;
};

type Props = {
  items: Variable[];
};

function VariablesList({ items }: Props) {
  return (
    <div className="variables-list">
      {items.map((item) => (
        <VariableItem
          key={item.ID}
          name={item.Name}
          description={item.Description}
        />
      ))}
    </div>
  );
}

export default VariablesList;