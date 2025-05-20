import { Fragment } from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Categories_Grid from "../components/Categories_Grid";
import Footers from "../components/Footers";


// Componente auxiliar


export default function Index() {

  return (
    <Fragment>
      <Navbar/>
      <Banner/>
      <Categories_Grid/>
      <Footers/>
    </Fragment>
  );
}