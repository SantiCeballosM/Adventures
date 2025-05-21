import { Fragment } from "react";
import Navbar from "../components/Navbar";
import EmprendimientosCategoria from "../components/EmprendimientosCategoria";
import Footers from "../components/Footers";



// Componente auxiliar


export default function Index() {

  return (
    <Fragment>
      <Navbar/>
        <EmprendimientosCategoria/>
      <Footers/>
    </Fragment>
  );
}