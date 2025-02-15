import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import BASE_URL from '../../../hooks/baseUrl';
import { Spinner } from 'react-bootstrap';
import useFetch from '../../../hooks/useFetch';
import useFormDataSubmit from '../../../hooks/useFormDataSubmit';

export default function Edit() {
    const location = useLocation();
    const id = location.pathname.split("/")[4];

    const [link, setLink] = useState("")
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const { content } = useContext(LanguageContext);

    const { data: editData } = useFetch(`${BASE_URL}/banners/${id}/edit`);

    useEffect(() => {
        if (editData) {
            setLink(editData.link || "");
            setPreview(editData.img_url || "");
        }
    }, [editData]);

    // Image upload handler with preview
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const { formSubmit, loading, error } = useFormDataSubmit();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputData = new FormData();
        inputData.append('link', link);
        if(image){
            inputData.append('image', image);
        }
        // console.log(inputData);
        

        let redirect = "/admin/banners";
        let msg = "Banner updated successfully";
        await formSubmit(BASE_URL + "/banners/" + id + "/update", inputData, "POST", redirect, msg);
    };

    return (
        <>
            <div className='card'>
                <div className='card-header'>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link to={'/admin/banners'} className='btn btn-sm btn-secondary'>
                                <ArrowLeftOutlined />
                            </Link>
                        </div>
                        <h5 className='card-title m-0'>{content?.admin?.banner?.edit}</h5>
                    </div>

                </div>
                <div className='card-body'>
                    {/* form */}
                    <div className="my-4 text-center">
                        {preview && (
                            <img src={preview} alt="preview" className='img-fluid rounded shadow' style={{ width: '100px' }} />
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className='form-label'>{content?.admin?.banner?.link}</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder={content?.admin?.banner?.enter_link}
                                    onChange={(e) => setLink(e.target.value)}
                                    value={link}
                                />
                                {error?.link && <div className="text-danger">{error?.link}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name" className='form-label'>{content?.admin?.banner?.image}</label>
                                <input type="file"
                                    className="form-control"
                                    placeholder={content?.admin?.banner?.enter_link}
                                    onChange={handleImage}
                                />
                                {error?.image && <div className="text-danger">{error?.image}</div>}
                            </div>
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-secondary" style={{ marginTop: '32px' }}>
                                    {loading ? <Spinner animation="border" size="sm" /> : <EditOutlined className="me-1" />}
                                    {content?.edit}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
