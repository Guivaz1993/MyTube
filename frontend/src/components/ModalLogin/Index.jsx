import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { post } from "../../services/functions";
import useUser from "../../hooks/useUser";

import "./styles.css";
import { setItem } from "../../utils/storage";

export default function Modal() {
  const { openModalLogin, toggleModalLogin } = useUser();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleFormValue(e) {
    if (e.target.password !== "password" && e.nativeEvent.data === " ") {
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function LoginOnClick() {
    setForm({
      username: "",
      password: "",
    });
    toggleModalLogin();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, status } = await post("/signin", form);
      console.log(data, status);
      if (status !== 200) {
        return toast.error(data.message);
      }

      setItem("token", data.token);

      toast.success("Olá, assista o seu vídeo com a gente");
      setForm({
        user: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return toggleModalLogin();
    }
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
              value={form.username}
              name="username"
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
          <div className="BtnLoginContainer">
            <button type="button" onClick={() => LoginOnClick()}>
              Fechar
            </button>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}
