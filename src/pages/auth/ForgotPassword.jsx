import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/auth.css";
import { useNavigate } from "react-router";
import { LanguageContext } from "../../contexts/LanguageContext";
import logo from "../../assets/img/logo/logo.png";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import BASE_URL from "../../hooks/baseUrl";
import { MailOutlined } from "@ant-design/icons"

export default function ForgotPassword() {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const { content } = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const forgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.redirected) {
        console.log('Redirected to:', response.url);
        setError("You are being redirected. Please check your authentication status.");
        return;
      }

      // Check for JSON response
      const contentType = response.headers.get("content-type");
      const resText = await response.text(); // Get the raw response

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = JSON.parse(resText);
          setSuccess(data.data);
          console.log("Password Reset Link sent successfully:", data);
        } else {
          setSuccess("Password reset link sent successfully.");
          console.log("Non-JSON success response:", resText);
        }
      } else {
        // Handle error responses (parsing as JSON if applicable)
        if (contentType && contentType.includes("application/json")) {
          const errorData = JSON.parse(resText);
          setError(errorData.message || "An error occurred");
          console.error("Error response:", errorData);
        } else {
          setError("Unable to send reset link.");
          console.error("Non-JSON error response:", resText);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
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
                  {content?.forgot_password_title}
                </h5>
                <Form onSubmit={forgotPassword}>
                  <div className="input-container">
                    <InputGroup>
                      <InputGroup.Text className="border border-0 py-3">
                        <MailOutlined />
                        {/* <i className="fa-regular fa-envelope"></i> */}
                      </InputGroup.Text>
                      <Form.Control
                        className="border border-0 py-3"
                        placeholder={content?.email}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </InputGroup>
                    {error && <span className="text-danger">*{error}</span>}
                    {success && <span className="text-success">{success}</span>}
                  </div>
                  <div className="input-container my-3">
                    <Button className="w-100 rounded-4 btn-login-theme" type="submit" disabled={loading}>
                      {loading ? <Spinner className="me-1" size="sm" /> : null}
                      {content?.send_reset_password_link}
                    </Button>
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
