import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      Home
      <div>
        <Link to="/results">Rto REsults</Link>
      </div>
    </div>
  );
}
