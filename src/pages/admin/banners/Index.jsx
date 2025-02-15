import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { LanguageContext } from '../../../contexts/LanguageContext';
import BASE_URL from '../../../hooks/baseUrl';
import useFetch from '../../../hooks/useFetch';
import Paginate from '../../../helpers/paginate';
import useFormSubmit from "../../../hooks/useFormSubmit";
import ChangeStatus from '../../../components/admin/banners/ChangeStatus';

export default function Index() {
  const { content } = useContext(LanguageContext);
  const [link, setLink] = useState('');
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState(BASE_URL + '/banners');
  const { data, loading } = useFetch(url);

  const search = (e) => {
    e.preventDefault();
    setUrl(BASE_URL + '/banners?link=' + link + '&is_active=' + status);
  }

  let banners = data?.data;
  let links = data?.links;
  let currentPage = data?.current_page;

  const pageChange = (newUrl) => {
    setUrl(newUrl);
  }
  const { formSubmit, error, loading: formLoading } = useFormSubmit();
  const changeStatus = async (id) => {
    let inputData = "";
    let method = "PUT";
    let redirect = "";
    let msg = "Banners status changed successfully";
    let currentUrl = url;
    let newUrl = url + " ";
    await formSubmit(BASE_URL + "/banners/" + id + '/status', inputData, method, redirect, msg);
    setUrl(url == currentUrl ? newUrl : currentUrl);
  }

  return (
    <div>
      {/* filter section */}
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title p-0 m-0">{content?.admin?.banners}</h5>
            <div>
              <Link className='btn btn-sm btn-secondary' to={'/admin/banners/create'}>
                <PlusOutlined className='me-1' />
                {content?.admin?.banner?.create}
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={search}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="name" className={`form-label`}>{content?.admin?.banner?.link}</label>
                <input type="text" 
                  className='form-control' 
                  placeholder={content?.admin?.banner?.enter_link}
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="name" className={`form-label`}>{content?.status}</label>
                <select name="" className='form-control form-select'
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="">{content?.select_status}</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <button type='submit' className={`btn btn-secondary`} style={{ marginTop: '33px' }}>
                  <SearchOutlined className='me-2' />
                  {content?.search}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* table section */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title p-0 m-0">{content?.admin?.banner?.list}</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">{content?.admin?.banner?.image}</th>
                  <th scope="col">{content?.admin?.banner?.link}</th>
                  <th scope="col">{content?.status}</th>
                  <th scope="col">{content?.action}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>Loading...</td>
                  </tr>
                ) : (
                  banners && banners.length !== 0 ? banners.map((banner, index) => (
                    <tr key={index}>
                      <td>
                        <img src={banner.img_url} className='rounded shadow' alt="" width={100} />
                      </td>
                      <td>
                        <Link to={banner.link} target='_blank'>
                          Link
                        </Link>
                      </td>
                      <td>
                        <span className={`${banner.is_active ? 'text-success' : 'text-danger'}`}>{banner.is_active ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td>
                        <Link to={'/admin/banners/edit/' + banner.id} className="text-secondary"
                        >
                          <EditOutlined className='me-2 text-success' />
                        </Link>
                        <ChangeStatus changeStatus={changeStatus} id={banner.id} is_active={banner.is_active} />
                        {/* <Delete deleteBrand={deleteBrand} id={brand.id} /> */}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7}>No data found</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <Paginate links={links} currentPage={currentPage} pageChange={pageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
