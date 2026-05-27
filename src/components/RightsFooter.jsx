import { Link } from "react-router-dom";
import "./RightsFooter.css";

// Global notice for visitors; legal language is intentionally visible but visually quiet.
function RightsFooter() {
  return (
    <footer className="rights-footer" aria-label="Image rights notice">
      <p>
        © {new Date().getFullYear()} Cataphract Visuals. All photographs are
        protected. No image may be copied, reproduced, downloaded, edited,
        published, printed, captured by screenshot for redistribution, used in
        datasets, or otherwise used without prior signed written approval from
        Cataphract Visuals.
      </p>
      <Link to="/rights">Image Rights</Link>
    </footer>
  );
}

export default RightsFooter;
