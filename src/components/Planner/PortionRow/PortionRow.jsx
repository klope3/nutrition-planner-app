import "./PortionRow.css";

export function PortionRow(props) {
  const {
    row: { fdcId },
  } = props;
  return <div className="portion-row">{fdcId}</div>;
}
