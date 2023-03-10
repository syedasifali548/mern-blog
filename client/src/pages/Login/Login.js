import React, { useState } from 'react'
import './login.css'
import LoginPic from '../../assets/images/login.png'
import {Container,Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import  axios  from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

   const handleSubmit= async(e)=>{
       e.preventDefault();
       try {
          const res = await axios.post('/api/v1/user/login',{
            email:email,
            password:password
          })
          if(res.data.success){
           dispatch(authActions.login())
           toast.success("User login Successfully");
           navigate("/");
          }
       } catch (error) {
        console.log(error);
       }
   }

  return (
    <>
    <section className='registerSection'>
    <Container className='registerContainer'>
      <Row>
        <Col md={6} sm={12}>
           <div className="signup_img_wrapper">
            <img src={LoginPic} alt="LoginPic"  className='img-fluid'/>
           </div>
        </Col>
        <Col md={6} sm={12}>
          <div className="register_form">
                <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputWrapper">
              <input type="email" placeholder='Email address' 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
              <input type="password" placeholder='Password'
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="btnsGroup">
              <button className='auth_btn'>LOGIN</button>
                 <Link to='/register'>Not a User? Rigister here</Link>
              </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
    </section>
    </>
  )
}

export default Login