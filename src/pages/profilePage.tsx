import { useEffect, useState } from 'react'
import NavigationBar from '../components/navbar'
import LoginForm from '../components/loginForm'
import '../css/form.scss'
import RegisterForm from '../components/registerForm'
import Profile from '../components/profile'
import { Outlet } from 'react-router-dom'

export interface LayoutContextType {
  triggerRefresh: () => void;
}

function ProfilePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div>
      <div className="navborder fixed">
        <NavigationBar className={`my-navbar `} />
      </div>

      {localStorage.getItem('token') ? (<Profile triggerRefresh={triggerRefresh} />) : null}

      <Outlet context={{ triggerRefresh }}/>
    </div>
  )
}

export default ProfilePage