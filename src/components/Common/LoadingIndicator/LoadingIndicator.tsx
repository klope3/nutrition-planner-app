import "./LoadingIndicator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";

export function LoadingIndicator() {
  return (
    <div className="modal-bg">
      <div className="loading-indicator">
        <div>
          <FontAwesomeIcon className="loading-visual" icon={faCarrot} />
          <FontAwesomeIcon
            className="loading-visual anim-offset-1"
            icon={faCarrot}
          />
          <FontAwesomeIcon
            className="loading-visual anim-offset-2"
            icon={faCarrot}
          />
        </div>
        Loading...
      </div>
    </div>
  );
}
