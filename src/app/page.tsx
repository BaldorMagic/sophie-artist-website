import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="gallery">
          <Gallery />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}
