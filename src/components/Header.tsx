import { NavLink } from "react-router-dom";
import "../styles/navbar.css"
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logoo.png"
import "../index.css"



function Header() {
  let {user} = useAuth()


  const SearchForm = () => (
  <form className="d-none d-lg-flex mx-auto w-50" role="search">
    <input
      className="form-control me-2 rounded-pill"
      type="search"
      placeholder="Search auctions..."
      aria-label="Search"
      style={{ minWidth: "250px", maxWidth: "400px" }}
    />
    <button className="btn btn-orange rounded-pill px-4" type="button">
      Search
    </button>
  </form>
);




  return (

    <>
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2">
      <div className="container-fluid">

        {/* Brand */}
        <NavLink className="navbar-brand d-flex align-items-center brand-text ms-3" to="/dashboard">
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
          
          {
          // Guest Navbar
          !user?(
          <div className="collapse navbar-collapse" id="nav-small-screen">
          <SearchForm/>
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
          </ul></div>)
          // User Navbar
          :user&&user.role==="user"?
          (<div className="collapse navbar-collapse me-3" id="nav-small-screen">
          <SearchForm/>
          <ul className="navbar-nav align-items-center justifty-content-center flew-grow-1">
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
              <NavLink className="nav-link" to="/user/notifications"><i className="bi bi-bell"></i></NavLink>
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
          </ul></div>)
          :
          // Admin Navbar
          (
          <div className="collapse navbar-collapse me-3 ms-5 ps-5" id="nav-small-screen">
          <ul className="navbar-nav align-items-center justify-content-between flex-grow-1">
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
              <NavLink className="nav-link" to="/admin/notifications"><i className="bi bi-bell"></i></NavLink>
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
          </ul></div>)}
         

      </div>
    </nav>
    

    </>
    
    
    
   
  );
}

export default Header;

// import { NavLink } from "react-router-dom";
// import "../styles/navbar.css";
// import { useAuth } from "../context/AuthContext";
// import logo from "../assets/logoo.png";

// function Header() {
//   const { user } = useAuth();

//   const SearchForm = () => (
//     <form className="d-none d-lg-flex mx-auto w-50" role="search">
//       <input
//         className="form-control me-2 rounded-pill"
//         type="search"
//         placeholder="Search auctions..."
//         aria-label="Search"
//         style={{ minWidth: "250px", maxWidth: "400px" }}
//       />
//       <button className="btn btn-orange rounded-pill px-4" type="button">
//         Search
//       </button>
//     </form>
//   );

//   return (
//     <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2">
//       <div className="container-fluid">
//         {/* Brand */}
//         <NavLink
//           className="navbar-brand d-flex align-items-center brand-text ms-3"
//           to="/dashboard"
//         >
//           <img src={logo} alt="Logo" style={{ width: 45 }} />
//           <span className="ms-1 fw-bolder">AuctionHub</span>
//         </NavLink>

//         {/* Toggler */}
//         <button
//           className="navbar-toggler me-3"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#nav-small-screen"
//           aria-controls="nav-small-screen"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse" id="nav-small-screen">
//           <SearchForm />
//           <ul className="navbar-nav ms-auto align-items-center gap-lg-3 me-3">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/dashboard">
//                 Dashboard
//               </NavLink>
//             </li>

//             {user && user.role === "user" && (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/user/createauction">
//                     Create Auction
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/user/myauction">
//                     My Auctions
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/user/mybids">
//                     My Bids
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/user/notifications">
//                     <i className="bi bi-bell"></i>
//                   </NavLink>
//                 </li>
//                 {/* Profile button triggers offcanvas */}
//                 <li className="nav-item">
//                   <button
//                     className="btn btn-orange"
//                     type="button"
//                     data-bs-toggle="offcanvas"
//                     data-bs-target="#profileOffcanvas"
//                     aria-controls="profileOffcanvas"
//                   >
//                     Profile
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
