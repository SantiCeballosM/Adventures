import { Fragment } from "react";
import Navbar from "../components/Navbar";
import MisEmprendimientos from "../components/MisEmprendimientos";
import Footers from "../components/Footers";

// Componente auxiliar

export default function Index() {
  return (
    <Fragment>
      <Navbar />
      <MisEmprendimientos />
      <Footers />
    </Fragment>
  );
}
