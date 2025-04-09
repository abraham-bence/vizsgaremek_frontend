import React, { useState } from 'react'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { apiClient } from '../core/api';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../pages/profilePage';

interface Props {
    changeState: () => void;
    changeLoggedIn: () => void;
}

interface Errors {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
}
function RegisterForm() {

    const navigate = useNavigate()
    const { triggerRefresh } = useOutletContext<LayoutContextType>();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'user'
    })
    const [errors, setErrors] = useState<Errors>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setErrors((prev) => ({
            ...prev,
            [name]: null,
        }))

        setData((prev) => ({
            ...prev,
            [name]: value == '' ? '' : value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        apiClient.post('/user', data)
            .then(res => {

                apiClient.post('/auth/login', { email: data.email, password: data.password })
                    .then((res) => {
                        setData({
                            name: '',
                            email: '',
                            password: '',
                            address: '',
                            role: 'user'
                        })
                        localStorage.setItem('token', res.data.access_token)
                        
                        navigate('/profile')
                        triggerRefresh()
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch(error => {
                console.log(error)
                setErrors(error.response.data.errors)
            })
    }

    return (
        <div className='formContainer'>
            <Form className='myForm' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' type="text" onChange={handleChange} value={data.name ? data.name : ''} placeholder="Enter name" className={errors.name ? "is-invalid" : ""} />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="text" onChange={handleChange} value={data.email ? data.email : ''} placeholder="Enter email" className={errors.email ? "is-invalid" : ""} />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" onChange={handleChange} value={data.password ? data.password : ''} placeholder="Password" className={errors.password ? "is-invalid" : ""} />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control name='address' type="text" onChange={handleChange} value={data.address ? data.address : ''} placeholder="Enter address" className={errors.address ? "is-invalid" : ""} />
                    <Form.Control.Feedback type="invalid">
                        {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="mb-3 btnGroup" >
                    <Button onClick={() => { navigate('/profile/login'); triggerRefresh() }}>
                        Login
                    </Button>
                    <Button className='activeBtn' type="submit" >
                        Register
                    </Button>
                </div>

            </Form>
        </div>
    )
}

export default RegisterForm