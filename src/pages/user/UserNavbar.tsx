import { NavLink } from "react-router-dom";


export default function UserNavbar() {

  return (
    <div className="bg-warning d-flex p-3 justify-content-between">
     <h4 className="m-0">Online Auction</h4>
    <NavLink className="nav-link" to="/user/dashboard">Dashboard</NavLink>
    <NavLink className="nav-link" to="/user/auction">Create Auction</NavLink>
    <NavLink className="nav-link" to="/user/myauction">My Auctions</NavLink>
    <NavLink className="nav-link" to="/user/mybids">My Bids</NavLink>
    <NavLink className="nav-link" to="/user/mypayments">Payments</NavLink>
    <NavLink className="nav-link" to="/user/notifications">Bell</NavLink>
    <NavLink className="nav-link me-3" to="/user/profile">Profile</NavLink>
    </div>
  )
}
