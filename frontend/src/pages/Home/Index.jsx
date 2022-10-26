import Header from "../../components/Header/Index";
import ModalLogin from "../../components/ModalLogin/Index";
import ModalNewRoom from "../../components/ModalNewRoom/Index";
import useUser from "../../hooks/useUser";

import "./styles.css";

export default function Home() {
  const { toggleModalRoom } = useUser();
  function click() {
    toggleModalRoom();
  }
  return (
    <>
      <Header />
      <ModalLogin />
      <ModalNewRoom />
      <article className="ContainerHome">
        <h1>Hello world!!</h1>
        <button type="button" onClick={() => click()}>
          Clique aqui
        </button>
      </article>
    </>
  );
}
