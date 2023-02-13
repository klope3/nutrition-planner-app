export function FoodSearchResult(props) {
  const { description, dataType } = props.food;
  return (
    <div>
      <div>{description}</div>
      <div>{dataType}</div>
    </div>
  );
}
