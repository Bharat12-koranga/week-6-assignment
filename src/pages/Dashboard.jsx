import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard Page</h1>
        <p>This is the Dashboard page.</p>
         <p>Welcome Bharat
Email: bharat@example.com</p>
         
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;