import React from 'react';
import { message, Popconfirm } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export default function ChangeStatus({ is_active, changeStatus, id }) {
    const confirm = (e) => {
        changeStatus(id);
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Cancled');
    };

    return (
        <>
            <Popconfirm
                title={`${is_active ? 'Deactivate' : 'Activate'} to Banner`}
                description="Are you sure?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                {is_active ? <CloseOutlined className="text-danger cursor-pointer" /> :  <CheckOutlined className="text-success cursor-pointer" /> }
            </Popconfirm>
        </>
    )
}