import { Euro } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSelected, setIsSelected] = useState("dashboard");
  return (
    <nav className="flex justify-between items-center mb-1 p-4 h-16">
      {/* LEFT SIDE */}
      <div className="flex items-center">
        <Euro strokeWidth={2} size={36}></Euro>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight -ml-1">
          CONO
        </h4>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-4">
        <Link to="/" onClick={() => setIsSelected("dashboard")}>
          dashboard
        </Link>
        <Link to="/predictions" onClick={() => setIsSelected("predictions")}>
          predictions
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
