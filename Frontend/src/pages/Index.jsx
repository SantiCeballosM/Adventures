import { Fragment } from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Categories_Grid from "../components/Categories_Grid";


// Componente auxiliar


export default function Index() {

  return (
    <Fragment>
      <Navbar/>
      <Banner/>
      <Categories_Grid/>
    </Fragment>
  );
}