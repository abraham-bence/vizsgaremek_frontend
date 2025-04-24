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
    const [orders, setOrders] = useState([])

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

    useEffect(() => {
        apiClient.get('/auth/profile/orders', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                setOrders(res.data)
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

    const handleClick = (id : number) => {
        if (id) {
            navigate(`/profile/order/${id}`) // Navigate to the order details page
        }
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
                <h2>Orders</h2>
                <div className='order-container'>
                    {orders.length > 0 ? orders.map((order: any) => (
                        <div key={order.id} className='orderItem' onClick={(e) => handleClick(order.id)}>
                            <p>Status: {order.status}</p>
                            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Order Total: {order.totalPrice} Ft</p>
                            <hr />
                        </div>
                    )) : <p>No orders found.</p>}
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