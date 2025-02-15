import React, { useContext } from 'react';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Space, message } from 'antd';
import { LanguageContext } from '../../contexts/LanguageContext';
import useLogout from '../../hooks/useLogout';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

const ProfileDropdown = () => {
    const { user } = useContext(AuthContext);
    const { logout, loading, error } = useLogout();
    const { content } = useContext(LanguageContext);
    const navigate = useNavigate();

    const handleMenuClick = async ({ key }) => {
        if (key === '4') {
            try {
                await logout();
            } catch (e) {
                message.error('Logout failed');
            }
        }
        if(key === '2'){
            navigate('/profile');
        }
    };

    const items = [
        {
            key: '1',
            label: content?.my_account,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: content?.my_profile,
            icon: <UserOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            label: content?.logout,
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];



    return (
        <Dropdown
            menu={{
                items,
                onClick: handleMenuClick,
            }}
        >
            <span> {/* Ensuring Dropdown receives a single child */}
                <Space className='text-secondary m-0 p-0'>
                    <UserOutlined className='d-md-none d-block' style={{ fontSize: '20px' }} />
                    <div className='d-none d-md-block'>
                        <span className='d-block mb-0 fw-bold'>{user?.name}</span>
                        <small style={{ fontSize: '12px' }}>{user?.roles?.map((role) => role?.name)}</small>
                    </div>
                    <DownOutlined className='d-none d-md-block' />
                </Space>
            </span>
        </Dropdown>
    );
};

export default ProfileDropdown;
