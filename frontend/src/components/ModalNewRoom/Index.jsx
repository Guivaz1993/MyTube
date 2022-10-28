/* eslint-disable comma-dangle */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useUser from "../../hooks/useUser";
import { post } from "../../services/functions";
import { getItem } from "../../utils/storage";

import "./styles.css";

export default function Modal() {
  const { openModalRoom, toggleModalRoom } = useUser();
  const navigate = useNavigate();
  const token = getItem("token");

  async function newRoomOnClick() {
    try {
      const { data, status } = await post(
        "/newroom",
        {
          name: "nova Sala",
          video_id: 1,
        },
        token
      );
      if (status !== 201) {
        return toast.error(data.message);
      }

      return navigate(`/room/${data.id}`);
    } catch (error) {
      return toast.error(error.message);
    }
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
        <button type="button" onClick={() => newRoomOnClick()}>
          Nova Sala
        </button>
        <button type="button" onClick={() => toggleModalRoom()}>
          Fechar
        </button>
      </div>
    </>
  );
}
