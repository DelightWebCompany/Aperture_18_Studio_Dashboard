import React from 'react'
import { useLocation } from 'react-router-dom'
import MenuBar from './MenuBar';

export default function Sidebar({ isOpen }) {
    const location = useLocation();
    let path = location.pathname.split('/')[1];

    return (
        <>
            <div className={`sidebar ${isOpen ? '' : 'd-none'} d-md-block`}>
                <MenuBar path={path} />
            </div>
        </>
    )
}
