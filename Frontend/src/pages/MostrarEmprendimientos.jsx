import { Fragment } from "react";
import Navbar from "../components/Navbar";
import MisEmprendimientos from "../components/MisEmprendimientos";

// Componente auxiliar

export default function Index() {
  return (
    <Fragment>
      <Navbar />
      <MisEmprendimientos />
    </Fragment>
  );
}
