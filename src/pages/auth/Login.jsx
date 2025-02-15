import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/auth.css";
import { useNavigate } from "react-router";
import { LanguageContext } from "../../contexts/LanguageContext"
import logo from "../../assets/img/logo/logo.png";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from "../../hooks/baseUrl";
import useLogin from "../../hooks/useLogin"
import { MailOutlined, UnlockOutlined } from "@ant-design/icons"

export default function Login() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { content } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputData = { email, password };
    let url = BASE_URL + '/admin_login';
    await login(url, inputData);
  };


  return (
    <div className="bg-login">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <div className="login-card">
              <div className="py-2 px-sm-4">
                <div className="text-center mb-3">
                  <img width={150} src={logo} alt="" />
                </div>
                <h5 className="text-center mb-4 fw-bold">
                  {content?.login_title}
                </h5>
                <Form className="" onSubmit={handleSubmit}>
                  <div className="input-container">
                    <InputGroup>
                      <InputGroup.Text
                        className="border border-0 py-3"
                        id="basic-addon1"
                      >
                        <MailOutlined />
                        {/* <i className="fa-regular fa-envelope"></i> */}
                      </InputGroup.Text>
                      <Form.Control
                        className=" border border-0 py-3"
                        placeholder={content?.email}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </InputGroup>
                    {error?.email && <span className="text-danger">*{error?.email}</span>}
                  </div>
                  <div className="input-container mb-2">
                    <InputGroup>
                      <InputGroup.Text
                        className="border border-0 py-3"
                        id="basic-addon1"
                      >
                        <UnlockOutlined />
                        {/* <i className="fas fa-unlock"></i> */}
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        className=" border border-0 py-3"
                        placeholder={content?.password}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </InputGroup>
                    {error?.password && (
                      <span className="text-danger">
                        *{error?.password}
                      </span>
                    )}
                    <div className="d-flex justify-content-end">
                      <div>
                        <Link to="/forgot-password" className="text-secondary cursor-pointer">{content?.forgot_password}</Link>
                      </div>
                    </div>
                  </div>

                  <div className="input-container my-3">
                    <Button
                      className="w-100 rounded-4 btn-login-theme"
                      type="submit"
                    >
                      {loading && (
                        <Spinner className="me-1" size="sm" />
                      )}
                      {content?.login_btn}
                    </Button>
                  </div>
                  <div className="text-center mt-1">
                    <span>{content?.do_not_have_acc}</span>
                    <Link to="/register" className="text-secondary ms-1">{content?.please_register}</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
