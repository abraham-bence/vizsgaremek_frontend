import React, { useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { useNavigate, useNavigation, useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../../pages/profilePage';
import { apiClient } from '../../core/api';
import { FaRegEye } from 'react-icons/fa';
import { TbEyeOff } from 'react-icons/tb';

interface Errors {
    email?: string;
    password?: string;
    auth?: false
}



function LoginForm() {

    const navigate = useNavigate()
    const { triggerRefresh } = useOutletContext<LayoutContextType>();

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState<Errors>()

    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setErrors((prev) => ({
            ...prev,
            [name]: null,
            auth: false
        }))

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        apiClient.post('/auth/login', data)
            .then(res => {
                console.log(res.data)
                // Handle successful login here, e.g., store the token in local storage
                navigate('/profile/myProfile')
                triggerRefresh()
                localStorage.setItem('token', res.data.access_token)
            })
            .catch(err => {
                setErrors(!err.response.data.errors ? { auth: true } : err.response.data.errors)
            })
    }

    return (
        <div className='formContainer'>
            <Form className='myForm' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="text" onChange={handleChange} value={data.email} placeholder="Enter email" className={errors?.email ? "is-invalid" : ""} />
                    <Form.Control.Feedback type="invalid">
                        {errors?.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name='password' type={showPassword ? 'text' : 'password'} onChange={handleChange} value={data.password} placeholder="Password" className={errors?.password ? "is-invalid" : ""} />
                        <Button
                            variant="outline-secondary"
                            onClick={togglePassword}
                            type="button"
                        >
                            {showPassword ? <FaRegEye /> : <TbEyeOff />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                        {errors?.password}
                    </Form.Control.Feedback> 
                    </InputGroup>
                                    
                </Form.Group>


                {errors?.auth ? (
                    <div className="text-danger">
                        Invalid username or password
                    </div>
                ) : null}



                <Form.Group className="mb-3 btnGroup" >
                    <Button className='activeBtn' type="submit">
                        Login
                    </Button>
                    <Button onClick={() => { navigate('/profile/register'); triggerRefresh() }} className='ml-2'>
                        Register
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginForm