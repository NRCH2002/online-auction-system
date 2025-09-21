import { NavLink } from "react-router-dom";
import "../../styles/navbar.css";

function PublicNavbar() {
  return (
    
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2">
      <div className="container-fluid">

        {/* Brand */}
        <NavLink className="navbar-brand d-flex align-items-center brand-text ms-3" to="/home">
          <img src="src/assets/logoo.png" alt="Logo" className="p-0 m-0" style={{ width: 45 }} />
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="nav-small-screen">

          {/* Search Bar for Large Screens */}
          <form className="d-none d-lg-flex mx-auto w-50" role="search">
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Search auctions..."
              aria-label="Search"
              style={{minWidth:"250px",maxWidth:"400px"}}
              
            /><button className="btn btn-orange rounded-pill px-4" type="button">
              Search
            </button>
            
          </form>

          {/* Nav Links */}
          <ul className="navbar-nav ms-auto align-items-center gap-lg-5">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink className="btn btn-orange px-4" to="/signup">Register</NavLink>
            </li>
          </ul>

          {/* Search Bar for Small Screens */}
          <form className="d-lg-none my-3 d-flex w-100" role="search">
            <input
              className="form-control me-2 rounded-pill"
              type="search"
              placeholder="Search auctions..."
              aria-label="Search"
            />
            <button className="btn btn-orange rounded-pill px-4" type="button">
              Search
            </button>
          </form>

        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
