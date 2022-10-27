import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Modal() {
  const { openModalLogin, toggleModalLogin } = useUser();
  const [form, setForm] = useState({
    user: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleFormValue(e) {
    if (e.target.password !== "password" && e.nativeEvent.data === " ") {
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function LoginOnClick() {
    setForm({
      user: "",
      password: "",
    });
    toggleModalLogin();
  }

  function handleSubmit(e) {
    e.preventDefault();
    toggleModalLogin();
    navigate("/");
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="user" className="ContainerInput">
            <span>Usuário</span>
            <input
              id="user"
              value={form.user}
              name="user"
              type="text"
              onChange={handleFormValue}
            />
          </label>
          <label htmlFor="passwordInput" className="ContainerInput">
            <span>Senha</span>
            <input
              id="passwordInput"
              value={form.password}
              name="password"
              type="password"
              onChange={handleFormValue}
            />
          </label>
          <button type="button" onClick={() => LoginOnClick()}>
            Fechar
          </button>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
