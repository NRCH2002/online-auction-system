import { Outlet } from "react-router-dom"
import PublicNavbar from "./PublicNavbar"
import Footer from "../../components/Footex"


function PublicLayout() {
  return (
    <div >
        <PublicNavbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PublicLayout