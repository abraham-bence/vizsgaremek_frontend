import React, { useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { useNavigate, useNavigation, useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../../pages/profilePage';
import { apiClient } from '../../core/api';
import { FaRegEye } from 'react-icons/fa';
import { TbEyeOff } from 'react-icons/tb';

interface Errors {
    password?: boolean
}

interface ChangePassword {
    password: string
    
}



function DeleteForm() {

    const navigate = useNavigate()
    const { triggerRefresh } = useOutletContext<LayoutContextType>();

    const [data, setData] = useState<ChangePassword>({password : "" })

    const [errors, setErrors] = useState<Errors>()

    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setErrors((prev) => ({
            ...prev,
            [name]: null
        }))

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        apiClient.delete('auth/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: data
        })
            .then(res => {
                // Handle successful login here, e.g., store the token in local storage
                navigate('/profile/register')
                triggerRefresh()
                localStorage.clear()
            })
            .catch(err => {
                setErrors(!err.response.data.errors ? { password: true } : err.response.data.errors)
            })
    }

    return (
        <div className='formContainer'>
            <Form className='myForm' onSubmit={handleSubmit}>
                <h2>Delete profile</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name='password' type={showPassword ? 'text' : 'password'} onChange={handleChange} value={data.password} placeholder="Enter password" className={errors?.password ? "is-invalid" : ""} />
                        <Button
                            variant="outline-secondary"
                            onClick={togglePassword}
                            type="button"
                        >
                            {showPassword ? <FaRegEye /> : <TbEyeOff />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                            Invalid password
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

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

export default DeleteForm