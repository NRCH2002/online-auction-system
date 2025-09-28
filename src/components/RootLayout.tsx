import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footex"
import Profile from "./Profile"


function RootLayout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <Profile/>
    </div>
  )
}

export default RootLayout