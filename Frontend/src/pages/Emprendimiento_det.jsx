import { Fragment } from "react";
import Navbar from "../components/Navbar";
import DetalleEmprendimiento from "../components/DetalleEmprendimiento";
import Footers from "../components/Footers";



// Componente auxiliar


export default function Index() {

  return (
    <Fragment>
      <Navbar/>
        <DetalleEmprendimiento/>
      <Footers/>
    </Fragment>
  );
}