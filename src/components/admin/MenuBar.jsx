import React, { useState, useEffect, useContext } from 'react';
import { UsergroupAddOutlined, DashboardOutlined, FileImageOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';

const MenuBar = ({ path }) => {
    const { lan, content } = useContext(LanguageContext);

    // Menu items configuration
    const menuItems = [
        {
            key: '',
            link: '/',
            label: content?.admin?.dashboard,
            icon: <DashboardOutlined />,
        },
        {
            key: 'user',
            label: content?.admin?.users,
            icon: <UsergroupAddOutlined />,
            children: [
                { key: 'users', link: '/users', label: content?.admin?.users, icon: <UserOutlined /> },
                { key: 'roles', link: '/roles', label: content?.admin?.roles, icon: <UserOutlined /> },
                { key: 'permissions', link: '/permissions', label: content?.admin?.permissions, icon: <UserOutlined /> },
                { key: 'role_permissions', link: '/role_permissions', label: content?.admin?.role_permissions, icon: <UserOutlined /> },
            ],
        },
        {
            key: 'banner',
            label: content?.admin?.banners,
            icon: <FileImageOutlined />,
            children: [
                { key: 'banners', link: '/banners', label: content?.admin?.banners, icon: <FileImageOutlined /> },
                { key: 'topics', link: '/engineering/topics', label: content?.engineering?.topics },
            ],
        },
    ];

    const navigate = useNavigate();
    const [currentKey, setCurrentKey] = useState('');

    // Update current key based on the path
    useEffect(() => {
        setCurrentKey(path);
    }, [path]);

    // Handle menu item clicks
    const handleClick = ({ key }) => {
        const item = menuItems
            .flatMap(menu => menu.children || [menu])
            .find(child => child.key === key);

        if (item?.link) navigate(item.link);
        setCurrentKey(key);
    };

    return (
        <Menu
            onClick={handleClick}
            style={{
                width: '100%',
                backgroundColor: 'transparent',
                fontSize: '16px',
            }}
            defaultOpenKeys={menuItems
                .filter(menu => path.startsWith(menu.key))
                .map(menu => menu.key)}
            selectedKeys={[currentKey]}
            mode="inline"
        >
            {menuItems.map(item => (
                item.children ? (
                    <Menu.SubMenu
                        key={item.key}
                        icon={item.icon && React.cloneElement(item.icon, { className: 'text-light' })}
                        title={
                            <div className="d-flex justify-content-between align-items-center text-white">
                                <span>{item.label}</span>
                            </div>
                        }
                    >
                        {item.children.map(child => (
                            <Menu.Item
                                key={child.key}
                                icon={child.icon && React.cloneElement(child.icon, { className: 'text-light' })}
                                className={currentKey === child.key ? 'active-item' : ''}
                            >
                                <div className="text-white">
                                    {child.label}
                                </div>
                            </Menu.Item>
                        ))}
                    </Menu.SubMenu>
                ) : (
                    <Menu.Item
                        key={item.key}
                        icon={item.icon && React.cloneElement(item.icon, { className: 'text-light' })}
                        className={currentKey === item.key ? 'active-item' : ''}
                    >
                        <div className="text-white">
                            {item.label}
                        </div>
                    </Menu.Item>
                )
            ))}
        </Menu>
    );
};

export default MenuBar;
