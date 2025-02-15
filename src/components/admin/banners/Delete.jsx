import React from 'react';
import { message, Popconfirm } from 'antd';
import {DeleteFilled} from '@ant-design/icons';

export default function Delete({ deleteBrand, id }) {
    const confirm = (e) => {
        deleteBrand(id);
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Cancled');
    };

    return (
        <>
            <Popconfirm
                title={`Remove the brand`}
                description="Are you sure?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <DeleteFilled className="text-danger cursor-pointer ms-2" />
            </Popconfirm>
        </>
    )
}