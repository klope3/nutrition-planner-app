export function FoodSearchResult(props) {
  const {
    food: { description, dataType, fdcId },
    selectFood,
  } = props;
  return (
    <div onClick={() => selectFood(fdcId)}>
      <div>{description}</div>
      <div>{dataType}</div>
      <div>{fdcId}</div>
    </div>
  );
}
