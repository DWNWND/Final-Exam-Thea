import { Helmet, HelmetProvider } from "react-helmet-async";
import SearchForm from "../../components/SearchForm";
import style from "./Home.module.css";

export default function Home() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Home | Holidayz</title>
        {/* <script src="https://kit.fontawesome.com/279950e6bf.js" crossorigin="anonymous"></script> */}
      </Helmet>
      <div>
        <section className={`${style.searchSection} p-4`}>
          <SearchForm />
        </section>
      </div>
    </HelmetProvider>
  );
}
