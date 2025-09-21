import { NavLink } from "react-router-dom"

function AdminNavbar() {
  return (
    <div> <div className="bg-warning d-flex p-3 justify-content-between">
     <h4 className="m-0">Online Auction</h4>
    <NavLink className="nav-link" to="/admin/dashboard">Admin Dashboard</NavLink>
    <NavLink className="nav-link" to="/admin/auction">Manage Auctions</NavLink>
    <NavLink className="nav-link" to="/admin/bids">Manage Bids</NavLink>
    <NavLink className="nav-link" to="/admin/users">Manage Users</NavLink>
    <NavLink className="nav-link" to="/admin/notifications">Bell</NavLink>
    <NavLink className="nav-link me-3" to="/admin/profile">Profile</NavLink>
    </div></div>
  )
}

export default AdminNavbar