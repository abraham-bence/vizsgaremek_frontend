import { useEffect, useState } from 'react'
import NavigationBar from '../components/navbar'
import '../css/form.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/footer';
import { jwtDecode, JwtPayload } from 'jwt-decode'


export interface LayoutContextType {
  triggerRefresh: () => void;
}

function ProfilePage() {
  const navigate = useNavigate()

  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded : JwtPayload = jwtDecode(token)
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        navigate("login")
      }
      else {
        navigate("profile/myProfile")
      }
    }
  }, [])

  return (
    <div>
      <div className="navborder fixed">
        <NavigationBar/>
      </div>


      <Outlet context={{ triggerRefresh }} />

      <Footer />

    </div>
  )
}

export default ProfilePage