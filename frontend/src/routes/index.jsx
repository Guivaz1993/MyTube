import { Routes, Outlet, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Index";


function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default Index;