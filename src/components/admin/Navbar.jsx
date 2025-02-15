import React from 'react'
import logo from "../../assets/img/logo/logo.png"
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';

export default function Navbar({handleOpen}) {
    return (
        <>
            <nav className='bg-light text-secondary px-3 shadow-lg'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-block d-md-none'>
                        <i className="fas fa-bars cursor-pointer"
                        onClick={handleOpen}
                        ></i>
                    </div>
                    <div className='py-2'>
                        <Link to={'/'}>
                            <img src={logo} width={70} alt="" />
                        </Link>
                    </div>
                    <div>
                        <ProfileDropdown />
                        {/* <UserOutlined style={{ fontSize: '20px' }} /> */}
                    </div>
                </div>
            </nav>
        </>
    )
}
