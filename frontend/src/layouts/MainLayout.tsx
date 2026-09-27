import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
