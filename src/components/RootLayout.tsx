import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footex";
import Profile from "./Profile";
import { SearchTermProvider } from "../context/SearchTermContext";

function RootLayout() {

  return (
    <div>
      <SearchTermProvider>
        <Header />
        <Outlet />
      </SearchTermProvider>
      <Footer />
      <Profile />
    </div>
  );
}

export default RootLayout;
