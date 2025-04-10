import React, { useState } from 'react'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { useNavigate, useNavigation, useOutletContext } from 'react-router-dom';
import { LayoutContextType } from '../../pages/profilePage';
import { apiClient } from '../../core/api';
import { FaRegEye } from 'react-icons/fa';
import { TbEyeOff } from 'react-icons/tb';

interface Errors {
    oldPassword?: string
    newPassword?: string
}

interface ChangePassword {
    oldPassword: string
    newPassword: string
}



function ChangePasswordForm() {

    const navigate = useNavigate()
    const { triggerRefresh } = useOutletContext<LayoutContextType>();

    const [data, setData] = useState<ChangePassword>({ oldPassword: "", newPassword: "" })

    const [errors, setErrors] = useState<Errors>()

    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }
    const togglePassword2 = () => {
        setShowPassword2((prev) => !prev)
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
        apiClient.patch('auth/changePassword', data ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                // Handle successful login here, e.g., store the token in local storage
                navigate('/profile/myProfile')
                triggerRefresh()
                localStorage.setItem('token', res.data.access_token)
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='formContainer'>
            <Form className='myForm' onSubmit={handleSubmit}>
                <h2>Change password</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Old password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name='oldPassword' type={showPassword ? 'text' : 'password'} onChange={handleChange} value={data.oldPassword} placeholder="Enter email" className={errors?.oldPassword ? "is-invalid" : ""} />
                        <Button
                            variant="outline-secondary"
                            onClick={togglePassword}
                            type="button"
                        >
                            {showPassword ? <FaRegEye /> : <TbEyeOff />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                            {errors?.oldPassword}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name='newPassword' type={showPassword2 ? 'text' : 'password'} onChange={handleChange} value={data.newPassword} placeholder="Password" className={errors?.newPassword ? "is-invalid" : ""} />
                        <Button
                            variant="outline-secondary"
                            onClick={togglePassword2}
                            type="button"
                        >
                            {showPassword2 ? <FaRegEye /> : <TbEyeOff />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                            {errors?.newPassword}
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

export default ChangePasswordForm