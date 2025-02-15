import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import logo from "../../assets/img/logo/logo.png";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { LanguageContext } from "../../contexts/LanguageContext";
import BASE_URL from '../../hooks/baseUrl';
import useFormSubmitToken from '../../hooks/useFormSubmitToken';
import { KeyOutlined } from "@ant-design/icons"

export default function ResetPassword() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || "No email provided";
  const { content } = useContext(LanguageContext);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const { formSubmitToken, error, loading } = useFormSubmitToken();

  const resetPassword = async (e) => {
    e.preventDefault();
    let url = BASE_URL + "/reset-password";
    let inputData = {
      token,
      email,
      password,
      password_confirmation,
    }
    let method = "POST";
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    };
    let redirect = "/login";
    let msg = "Password reset successfully."
    await formSubmitToken(url, inputData, method, headers, redirect, msg);
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
                    {content?.reset_password_title}
                  </h5>
                  <Form onSubmit={resetPassword}>
                    <div className="input-container">
                      <InputGroup>
                        <InputGroup.Text className="border border-0 py-3">
                          {/* <i className="fas fa-key"></i> */}
                          <KeyOutlined />
                        </InputGroup.Text>
                        <Form.Control
                          type='password'
                          className="border border-0 py-3"
                          placeholder={content?.enter_new_password}
                          aria-describedby="basic-addon1"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </InputGroup>
                      {error?.password && <span className="text-danger">*{error.password}</span>}
                    </div>
                    <div className="input-container">
                      <InputGroup>
                        <InputGroup.Text className="border border-0 py-3">
                          <KeyOutlined />
                        </InputGroup.Text>
                        <Form.Control
                          type='password'
                          className="border border-0 py-3"
                          placeholder={content?.enter_confirm_password}
                          aria-describedby="basic-addon1"
                          onChange={(e) => setPasswordConfirmation(e.target.value)}
                          value={password_confirmation}
                        />
                      </InputGroup>
                      {error?.password_confirmation && <span className="text-danger">*{error.password_confirmation}</span>}
                    </div>
                    <div className="input-container my-3">
                      <Button className="w-100 rounded-4 btn-login-theme" type="submit" disabled={loading}>
                        {loading ? <Spinner className="me-1" size="sm" /> : null}
                        {content?.reset_password}
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
