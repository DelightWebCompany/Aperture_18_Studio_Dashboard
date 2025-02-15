import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { ArrowLeftOutlined, EditOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
import useFormSubmit from '../../../hooks/useFormSubmit';
import BASE_URL from '../../../hooks/baseUrl';
import { Spinner } from 'react-bootstrap';
import useFetch from '../../../hooks/useFetch';

export default function Edit() {
    const location = useLocation();
    const id = location.pathname.split("/")[4];
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [role, setRole] = useState("")
    // const [status, setStatus] = useState("");
    const { content } = useContext(LanguageContext);

    const { data: editData } = useFetch(`${BASE_URL}/users/${id}/edit`);

    useEffect(() => {
        if (editData) {
            setName(editData.name || "");
            setEmail(editData.email || "");
            setRole(editData.role || "");
            // setStatus(editData.is_active || "");
        }
    }, [editData]);

    const { formSubmit, loading, error } = useFormSubmit();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = BASE_URL + "/users/" + id;
        let inputData = {
            name,
            email,
            role
        }
        let method = "PUT";

        let redirect = "/admin/users";
        let msg = "User updated successfully";
        await formSubmit(url, inputData, method, redirect, msg);
    };
    const changePassword = async (e) => {
        e.preventDefault();
        let url = BASE_URL + "/users/" + id + "/change-password";
        let inputData = {
            password,
            password_confirmation,
        }
        let method = "PUT";

        let redirect = "/admin/users";
        let msg = "User Password changed successfully";
        await formSubmit(url, inputData, method, redirect, msg);
    };

    return (
        <>
            <div className='card'>
                <div className='card-header'>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link to={'/admin/users'} className='btn btn-sm btn-secondary'>
                                <ArrowLeftOutlined />
                            </Link>
                        </div>
                        <h5 className='card-title m-0'>{content?.admin?.user?.edit}</h5>
                    </div>
                </div>
                <div className='card-body'>
                    <div className="d-flex justify-content-center py-2">
                        <div className='text-center'>
                            {editData?.image ? <img src={editData?.img_url} width={60} alt="" /> : <UserOutlined className='text-secondary fs-1 border border-secondary rounded-circle p-2' /> }
                            {editData?.phone ? <p classphone='mt-3 mb-0 fw-bold'>{editData?.name}</p> : <p></p> }
                            {editData?.address ? <p className='mt-0 pt-0 fw-bold'>{editData?.address}</p> : <p></p> }
                        </div>
                    </div>
                    {/* form */}
                    <form onSubmit={handleSubmit}>
                        <h5 className='mb-3'>Update Profile</h5>
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
                                {loading ? <Spinner animation="border" size="sm" /> : <EditOutlined className="me-1" />}
                                {content?.edit}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card-body pb-4">
                    <form onSubmit={changePassword}>
                        <h5 className='mb-3'>Change Password</h5>
                        <div className="row">
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
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-secondary">
                                {loading ? <Spinner animation="border" size="sm" /> : <KeyOutlined className="me-1" />}
                                {content?.change_password}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
