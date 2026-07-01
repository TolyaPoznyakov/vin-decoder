import VariableItem from "../VariableItem/VariableItem";
import type { Variable } from "../../types/variable.ts";

type Props = {
  items: Variable[];
};

function VariablesList({ items }: Props) {
  return (
    <div>
      {items.map((item) => (
        <VariableItem
          key={item.ID}
          id={item.ID}
          name={item.Name}
          description={item.Description}
        />
      ))}
    </div>
  );
}

export default VariablesList;