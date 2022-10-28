import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { clearAll, getItem } from "../../utils/storage";

import "./styles.css";

export default function Header() {
  const { toggleModalLogin, openModalLogin } = useUser();
  const navigate = useNavigate();
  const token = getItem("token");

  function LoginOnClick() {
    toggleModalLogin();
  }

  function logoff() {
    clearAll();
    navigate("/");
  }
  useEffect(() => {}, [openModalLogin]);
  return (
    <header className="Header">
      <button type="button" onClick={() => navigate("/")}>
        <h2>GuiTube</h2>
      </button>
      <div>
        {token ? (
          <button type="button" onClick={logoff}>
            Logoff
          </button>
        ) : (
          <button type="button" onClick={() => LoginOnClick()}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
