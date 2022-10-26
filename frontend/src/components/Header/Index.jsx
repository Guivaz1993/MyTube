import { useEffect } from "react";
import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Header() {
  const { toggleModalLogin } = useUser();
  function LoginOnClick() {
    toggleModalLogin();
  }
  useEffect(() => {}, []);
  return (
    <header className="Header">
      <h2>GuiTube</h2>
      <div>
        <button type="button" onClick={() => LoginOnClick()}>
          Login
        </button>
      </div>
    </header>
  );
}
