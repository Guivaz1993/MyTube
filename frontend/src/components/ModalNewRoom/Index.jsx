import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Modal() {
  const { openModalRoom, toggleModalRoom } = useUser();
  const navigate = useNavigate();

  function LoginOnClick() {
    toggleModalRoom();
    navigate("/room");
  }
  useEffect(() => {}, []);
  return (
    <>
      <div
        className={
          openModalRoom
            ? "OpenBGRoom ModalBackgroundRoom"
            : "ModalBackgroundRoom"
        }
      />
      <div
        className={
          openModalRoom ? "OpenModalRoom ModalRoom" : "CloseModalRoom ModalRoom"
        }
      >
        <button type="button" onClick={() => LoginOnClick()}>
          Nova Sala
        </button>
      </div>
    </>
  );
}
