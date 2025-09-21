import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Profile() {
  let {logout} = useAuth()
  let navigate = useNavigate()
  return (
    <>
     <div className='bg-success p-5  display-5 text-center'>Profile</div>
    <button type="button" className='btn btn-danger' 
    onClick={()=>{
      logout() 
      navigate("/")}}>Logout</button>
    </>
   
  )
}

export default Profile