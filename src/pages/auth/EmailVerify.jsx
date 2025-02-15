import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import decodedUrl from '../../helpers/decodedUrl';
import BASE_URL from '../../hooks/baseUrl';
import useFetch from '../../hooks/useFetch';
import logo from "../../assets/img/logo/logo.png";
import { LanguageContext } from "../../contexts/LanguageContext";


export default function EmailVerify() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  const { content } = useContext(LanguageContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const url = token ? decodedUrl(token) : '';
  const { data: user } = useFetch(BASE_URL + "/user");
  console.log(user);


  const [success, setSuccess] = useState("");

  const verifyEmail = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.data);
        navigate('/');
        console.log('Verification successful:', data);
      } else {
        console.error('Error verifying email:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };


  return (
    <>
      <div className="bg-login">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
              <div className="login-card">
                <div className="py-2 px-sm-4">
                  <div>
                    <img className="w-100" src={logo} alt="Logo" />
                  </div>
                  <h5 className="text-center mb-4 fw-bold">
                    <p>{content?.email_verification}</p>
                    {user?.email_verified_at ? <h5 className='text-success'>The email has already verified.</h5> : success ? (
                      <h5 className='text-success'>Email Verified Successfully</h5>
                    ) : (
                      <button className='btn btn-secondary' onClick={verifyEmail}>Please Click to Verify</button>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
