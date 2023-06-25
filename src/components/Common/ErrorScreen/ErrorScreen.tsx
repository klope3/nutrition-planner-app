import { useNavigate } from "react-router-dom";
import "./ErrorScreen.css";

export function ErrorScreen() {
  const navigate = useNavigate();
  return (
    <div className="error-screen">
      <h1>Oops! Something went wrong. 🤦</h1>
      <p>
        It's probably a server issue. Use your "Back" button to try again, or go
        home:
      </p>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
