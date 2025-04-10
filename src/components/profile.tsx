import React, { useContext, useEffect, useState } from 'react'
import { apiClient } from '../core/api'
import { Button } from 'react-bootstrap'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { LayoutContextType } from '../pages/profilePage'

interface Profile {
    username: string
    email: string
    address: string
}



function Profile() {
    const navigate = useNavigate()
    const { triggerRefresh } = useOutletContext<LayoutContextType>();


    const [profile, setProfile] = useState<Profile>()

    useEffect(() => {
        apiClient.get('/auth/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                setProfile(res.data)
            })
            .catch((err) => {
                console.log('igen')
                console.log(err)
            })
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/profile/login')
        triggerRefresh()
    }


    return (
        <div className='formContainer'>
            <div className='myForm'>
                <h2>Profile</h2>
                <div className='mb-3'>
                    <p>Name: {profile?.username}</p>
                    <p>Email: {profile?.email} </p>
                    <p>Address: {profile?.address} </p>

                </div>
                <div className="mb-3 btnGroup" >
                    <Button onClick={() => { navigate('/profile/edit'); triggerRefresh() }} className='activeBtn' type="submit">
                        Edit
                    </Button>
                    
                    <Button onClick={handleLogout} className='ml-2'>
                        Logout
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Profile