import { Outlet } from "react-router-dom";

import Navbar from "./components/NavBar";

function Layout() {
  return (
    <div className="min-h-full">
      <div className="py-0">
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;