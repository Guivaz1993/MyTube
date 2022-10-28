import { useEffect } from "react";

import Header from "../../components/Header/Index";
import ModalLogin from "../../components/ModalLogin/Index";
import ModalNewRoom from "../../components/ModalNewRoom/Index";
import useUser from "../../hooks/useUser";

import { getItem } from "../../utils/storage";

import "./styles.css";

export default function Home() {
  const { toggleModalRoom, toggleModalLogin, openModalLogin } = useUser();
  const token = getItem("token");

  function click() {
    if (token) {
      toggleModalRoom();
    } else {
      toggleModalLogin();
    }
  }

  useEffect(() => {}, [openModalLogin]);
  return (
    <>
      <Header />
      <ModalLogin />
      <ModalNewRoom />
      <article className="ContainerHome">
        <section className="DescriptionSection">
          Crie uma sala e assista com seus amigos um dos nossos vídeos.
        </section>
        <section className="LoginSection">
          <p className="LoginSectionText">
            Já está logado? então vamos lá e crie sua sala para poder
            compartilhar com os amigos
          </p>
          {token ? (
            <button type="button" onClick={() => click()}>
              Clique aqui
            </button>
          ) : (
            <button type="button" onClick={() => click()}>
              Faça o login
            </button>
          )}
        </section>
      </article>
    </>
  );
}
