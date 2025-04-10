import React, { useEffect, useState } from 'react'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { apiClient } from '../../core/api';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../../pages/profilePage';
import Profile from '../profile';

interface Props {
    changeState: () => void;
    changeLoggedIn: () => void;
}

interface Errors {
    validation?: string
}

interface User {
    name?: string;
    address?: string;
}

function EditForm() {

    const navigate = useNavigate()
    const { triggerRefresh } = useOutletContext<LayoutContextType>();

    const [data, setData] = useState<User>()
    const [errors, setErrors] = useState<Errors>({})

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setErrors({
            validation : undefined
        })

        setData((prev) => ({
            ...prev,
            [name]: value == '' ? '' : value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        apiClient.patch('auth/profile', data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.access_token)
                navigate('/profile/myProfile')
                triggerRefresh()
            })
            .catch((err) => {
                console.log(err.response.data.message)
                setErrors({validation : err.response.data.message})
            })
    }

    return (
        <div className='formContainer'>
            <Form className='myForm' onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Name - {profile?.username}</Form.Label>
                    <Form.Control name='name' type="text" onChange={handleChange} value={data?.name ? data.name : ''} placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Address - {profile?.address}</Form.Label>
                    <Form.Control name='address' type="text" onChange={handleChange} value={data?.address ? data.address : ''} placeholder="Enter address" />
                </Form.Group>

                {errors?.validation ? (
                    <div className="text-danger">
                        one of the fields should not be empty
                    </div>
                ) : null}

                <div className="mb-3 btnGroup" >
                    <Button className='dangerBtn' onClick={() => { navigate('/profile/changePassword'); triggerRefresh() }}>
                        Change Password
                    </Button>
                </div>

                <div className="mb-3 btnGroup" >
                    <Button className='dangerBtn' onClick={() => { navigate('/profile/delete'); triggerRefresh() }}>
                        Delete profile
                    </Button>
                </div>

                <div className="mb-3 btnGroup" >
                    <Button onClick={() => { navigate('/profile/myProfile'); triggerRefresh() }}>
                        Go back
                    </Button>
                    <Button className='activeBtn' type="submit" >
                        Confirm
                    </Button>
                </div>

            </Form>
        </div>
    )
}

export default EditForm

