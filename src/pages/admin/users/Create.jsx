import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import useFormSubmit from '../../../hooks/useFormSubmit';
import BASE_URL from '../../../hooks/baseUrl';
import { Spinner } from 'react-bootstrap';

export default function Create() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [role, setRole] = useState("")
    // const [status, setStatus] = useState("");
    const { content } = useContext(LanguageContext);

    const { formSubmit, loading, error } = useFormSubmit(); 
    const handleSubmit = async(e) => {
        e.preventDefault();
        let inputData = {
            name,
            email,
            phone,
            password,
            password_confirmation,
            role,
        }
        
        let redirect = "/admin/users";
        let msg = "User created successfully";
        await formSubmit(BASE_URL + "/users", inputData, "POST", redirect, msg);
    };

    return (
        <>
            <div className='card'>
                <div className='card-header'>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link to={'/users'} className='btn btn-sm btn-secondary'>
                                <ArrowLeftOutlined />
                            </Link>
                        </div>
                        <h5 className='card-title m-0'>{content?.admin?.user?.create}</h5>
                    </div>

                </div>
                <div className='card-body'>
                    {/* form */}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className='form-label'>{content?.admin?.user?.name}</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder={content?.admin?.user?.enter_name}
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                {error?.name && <div className="text-danger">{error?.name}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className='form-label'>{content?.admin?.user?.email}</label>
                                <input type="email"
                                    className="form-control"
                                    placeholder={content?.admin?.user?.enter_email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                {error?.email && <div className="text-danger">{error?.email}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className='form-label'>{content?.admin?.user?.password}</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder={content?.admin?.user?.enter_password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                {error?.password && <div className="text-danger">{error?.password}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className='form-label'>{content?.admin?.user?.confirm_password}</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder={content?.admin?.user?.enter_confirm_password}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    value={password_confirmation}
                                />
                                {error?.password_confirmation && <div className="text-danger">{error?.password_confirmation}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="role" className='form-label'>{content?.admin?.user?.role}</label>
                                <select className="form-select"
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                >
                                    <option value="">{content?.admin?.user?.select_role}</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                {error?.role && <div className="text-danger">{error?.role}</div>}
                            </div>
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-secondary">
                                {loading ? <Spinner animation="border" size="sm" /> : <PlusOutlined className='me-1' />}
                                {content?.create}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
