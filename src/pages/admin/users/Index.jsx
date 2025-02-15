import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { LanguageContext } from '../../../contexts/LanguageContext';
import BASE_URL from '../../../hooks/baseUrl';
import useFetch from '../../../hooks/useFetch';
import Paginate from '../../../helpers/paginate';
import useFormSubmit from "../../../hooks/useFormSubmit";
import ChangeStatus from '../../../components/admin/users/ChangeStatus';

export default function Index() {
  const { content } = useContext(LanguageContext);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState(BASE_URL + '/users');
  const { data, loading } = useFetch(url);

  const search = (e) => {
    e.preventDefault();
    setUrl(BASE_URL + '/users?role=' + role + '&is_active=' + status);
  }

  let users = data?.data;
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
    let msg = "User status changed successfully";
    let currentUrl = BASE_URL + "/users";
    let newUrl = BASE_URL + "/users ";
    await formSubmit(BASE_URL + '/users/' + id + '/status', inputData, method, redirect, msg);
    setUrl(url == currentUrl ? newUrl : currentUrl);
  }

  return (
    <div>
      {/* filter section */}
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title p-0 m-0">Users</h5>
            <div>
              <Link className='btn btn-sm btn-secondary' to={'/users/create'}>
                <PlusOutlined className='me-1' />
                {content?.admin?.user?.create}
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={search}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="name" className={`form-label`}>{content?.admin?.user?.roles}</label>
                <select className='form-control form-select'
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="">{content?.admin?.user?.select_role}</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="name" className={`form-label`}>{content?.admin?.user?.status}</label>
                <select name="" className='form-control form-select'
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="">{content?.admin?.user?.select_status}</option>
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
          <h5 className="card-title p-0 m-0">{content?.admin?.user?.list}</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{content?.admin?.user?.name}</th>
                  <th scope="col">{content?.admin?.user?.email}</th>
                  <th scope="col">{content?.admin?.user?.phone}</th>
                  <th scope="col">{content?.admin?.user?.role}</th>
                  <th scope="col">{content?.admin?.user?.is_online}</th>
                  <th scope="col">{content?.admin?.user?.status}</th>
                  <th scope="col">{content?.action}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>Loading...</td>
                  </tr>
                ) : (
                  users && users.length !== 0 ? users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <span className={`${user.is_online === 1 ? 'badge text-bg-success' : 'badge text-bg-danger'}`}>{user.is_online ? 'Online' : 'Offline'}</span>
                      </td>
                      <td>
                        <span className={`${user.is_active === 1 ? 'text-success' : 'text-danger'}`}>{user.is_active ? 'Active' : 'Inactive'}</span>

                      </td>
                      <td>
                        <Link to={'/admin/users/edit/' + user.id} className="text-secondary"
                        >
                          <EditOutlined className='me-2 text-success' />
                          {/* <i className="fas fa-pen-to-square"></i> */}
                        </Link>
                        <ChangeStatus is_active={user.is_active} changeStatus={changeStatus} id={user.id} />
                      </td>
                    </tr>
                  )) : (
                    <tr className='text-center'>
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
