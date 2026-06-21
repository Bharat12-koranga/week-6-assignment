import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>About Page</h1>
        <p>This is the About page.</p>
      </div>

      <Footer />
    </>
  );
}

export default About;