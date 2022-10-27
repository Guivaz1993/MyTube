import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Index";
import Room from "../pages/Room/Index";

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room" element={<Room />} />
    </Routes>
  );
}

export default Index;
