import { useState } from "react";

function useUserProvider() {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  function toggleModalLogin() {
    setOpenModalLogin(!openModalLogin);
  }
  const [openModalRoom, setOpenModalRoom] = useState(false);
  function toggleModalRoom() {
    setOpenModalRoom(!openModalRoom);
  }
  return {
    openModalLogin,
    toggleModalLogin,
    openModalRoom,
    toggleModalRoom,
  };
}

export default useUserProvider;
