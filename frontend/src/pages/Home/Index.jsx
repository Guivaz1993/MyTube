import { useEffect } from "react";

import Header from "../../components/Header/Index";
import ModalLogin from "../../components/ModalLogin/Index";
import ModalNewRoom from "../../components/ModalNewRoom/Index";
import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Home() {
  const { toggleModalRoom, toggleModalLogin } = useUser();
  const login = true;

  function click() {
    if (login) {
      toggleModalRoom();
    } else {
      toggleModalLogin();
    }
  }

  useEffect(() => {}, []);
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
          {login ? (
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
