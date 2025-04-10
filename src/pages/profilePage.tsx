import { useEffect, useState } from 'react'
import NavigationBar from '../components/navbar'
import '../css/form.scss'
import { Outlet, useNavigate } from 'react-router-dom'

export interface LayoutContextType {
  triggerRefresh: () => void;
}

function ProfilePage() {
  const navigate = useNavigate()

  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('profile/myProfile')
    }
  }, [])

  return (
    <div>
      <div className="navborder fixed">
        <NavigationBar className={`my-navbar `} />
      </div>


      <Outlet context={{ triggerRefresh }}/>
    </div>
  )
}

export default ProfilePage