import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/pages/dashboard";
import Predictions from "@/pages/predictions";

function App() {
  return (
    <div className="dark bg-background text-foreground">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predictions" element={<Predictions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
