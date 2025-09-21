import { Outlet } from "react-router-dom"
import AdminNavbar from "./AdminNavbar"
import Footer from "../../components/Footex"


function AdminLayout() {
  return (
    <div>
        <AdminNavbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AdminLayout