import { useEffect } from "react";
import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Modal() {
  const { openModalRoom, toggleModalRoom } = useUser();
  function LoginOnClick() {
    toggleModalRoom();
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
