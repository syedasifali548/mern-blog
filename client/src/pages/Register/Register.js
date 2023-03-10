import React, { useState } from "react";
import "./Register.css";
import signupPic from "../../assets/images/signup.png";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  //state
const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: username,
        email: email,
        password: password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="registerSection">
        <Container className="registerContainer">
          <Row>
            <Col md={6} sm={12}>
              <div className="signup_img_wrapper">
                <img src={signupPic} alt="signup" className="img-fluid" />
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className="register_form">
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                  <div className="inputWrapper">
                    <input
                      type="text"
                      placeholder="Name"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className="btnsGroup">
                      <button className="auth_btn">REGISTER</button>
                      <Link to="/login">Already Register? Login here</Link>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
