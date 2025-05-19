import { Fragment } from "react";
import Navbar from "../components/Navbar";
import CrearEmprendimiento from "../components/CrearEmprendimiento";

export default function Index() {
  return (
    <Fragment>
      <Navbar />
      <CrearEmprendimiento />
    </Fragment>
  );
}
