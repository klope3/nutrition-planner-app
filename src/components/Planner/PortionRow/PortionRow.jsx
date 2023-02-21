import "./PortionRow.css";

export function PortionRow(props) {
  const {
    row: { fdcId, id },
    deletePortion,
  } = props;

  return (
    <div className="portion-row">
      {fdcId}
      <button className="button-x" onClick={() => deletePortion(id)}>
        X
      </button>
    </div>
  );
}
