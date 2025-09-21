
import { Outlet } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import Footer from '../../components/Footex'


function UserLayout() {
  return (
    <div><UserNavbar/><Outlet/><Footer/></div>
  )
}

export default UserLayout