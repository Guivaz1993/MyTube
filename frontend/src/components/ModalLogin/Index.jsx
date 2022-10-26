import { useEffect } from "react";
import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Modal() {
  const { openModalLogin, toggleModalLogin } = useUser();
  function LoginOnClick() {
    toggleModalLogin();
  }
  useEffect(() => {}, []);
  return (
    <>
      <div
        className={
          openModalLogin ? "OpenBG ModalBackground" : "ModalBackground"
        }
      />
      <div className={openModalLogin ? "OpenModal Modal" : "CloseModal Modal"}>
        <button type="button" onClick={() => LoginOnClick()}>
          Fechar
        </button>
      </div>
    </>
  );
}
