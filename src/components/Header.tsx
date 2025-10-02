import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logoo.png";
import "../styles/header.css";
import "../index.css";
import { useSearchTermContext } from "../context/SearchTermContext";
import { useEffect, useState } from "react";

function Header() {
  const { user } = useAuth();
  const { setSearchTerm, searchTerm } = useSearchTermContext();
    const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
 
useEffect(() => {
  // Close navbar whenever route changes
  setIsNavOpen(false);
}, [location]);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2 sticky-top" >
      <div className="container-fluid">
        {/* Brand */}
        <NavLink
          className="navbar-brand d-flex align-items-center brand-text ms-3"
          to="/dashboard"
        >
          <img src={logo} alt="Logo" className="p-0 m-0" style={{ width: 45 }} />
          <span className="ms-1 fw-bolder">AuctionHub</span>
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav-small-screen"
          aria-controls="nav-small-screen"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className={`navbar-collapse ${isNavOpen ? "show" : "collapse"}`} id="nav-small-screen">
          {/* Search Bar for Guests and Users */}
          {(!user || user.role === "user") && (
            <form className="d-flex justify-content-center w-100 my-2" role="search">
  <div className="input-group" style={{ maxWidth: "400px", width: "100%" }}>
    <span
      className="input-group-text bg-orange text-white"
      style={{
        border: "1px solid #ccc",
      }}
    >
      <i className="bi bi-search fs-5"></i>
    </span>
    <input
      type="search"
      className="form-control "
      placeholder="Search auctions..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        borderColor: "#ccc",
        boxShadow: "none",
        outline: "none",
      }}
    />
  </div>
</form>

          )}

          {/* Navigation Links */}
          {!user ? (
            // Guest Navbar
            <ul className="navbar-nav ms-auto align-items-center gap-lg-5 me-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="btn btn-orange" to="/signup">Register</NavLink>
              </li>
            </ul>
          ) : user.role === "user" ? (
            // User Navbar
            <ul className="navbar-nav align-items-center justify-content-center flex-grow-1 me-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user/createauction">Create Auction</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user/myauction">My Auctions</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user/mybids">My Bids</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user/mypayments">Payments</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user/notifications">
                  <i className="bi bi-bell"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn text-orange"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#profileOffcanvas"
                  aria-controls="profileOffcanvas"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                </button>
              </li>
            </ul>
          ) : (
            // Admin Navbar
            <ul className="navbar-nav align-items-center justify-content-between flex-grow-1 me-3 ms-5 ps-5">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/manageauction">Manage Auctions</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/managebids">Manage Bids</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/manageusers">Manage Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/notifications">
                  <i className="bi bi-bell"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn text-orange"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#profileOffcanvas"
                  aria-controls="profileOffcanvas"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
