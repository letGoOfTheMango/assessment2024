import Header from "@header/Header";
import Footer from "@footer/Footer";
import Tabs from "@tabs/Tabs";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Tabs />
      </main>
      <Footer />
    </>
  );
}
