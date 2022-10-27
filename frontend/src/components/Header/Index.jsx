import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Header() {
  const { toggleModalLogin } = useUser();
  const navigate = useNavigate();
  function LoginOnClick() {
    toggleModalLogin();
  }
  useEffect(() => {}, []);
  return (
    <header className="Header">
      <button type="button" onClick={() => navigate("/")}>
        <h2>GuiTube</h2>
      </button>
      <div>
        <button type="button" onClick={() => LoginOnClick()}>
          Login
        </button>
      </div>
    </header>
  );
}
