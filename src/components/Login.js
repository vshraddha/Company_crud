import React from 'react'
import "../styles/Login.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }

  }, [])


  const handlelogin = async (e) => {
    e.preventDefault();


    if (!email || !pass) {
      alert("Please enter both email and password");
      return;
    }


    console.warn(email, pass)
    const result = await fetch('http://localhost:5001/login', {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await result.json();
    console.warn(data)
    if (!data.error) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/")

    }
    else {
      alert("please enter correct details")
    }


  }

  return (
    <div>
      <div className='form'>
        <form>
          <h1 className='heading'>Login</h1>

          <p className='para'>Email id</p>
          <input type="text" className='field' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your mail" />

          <p className='para'>Password</p>
          <input type="password" className='field' onChange={(e) => setPass(e.target.value)} value={pass} placeholder="Enter Your password" />

          <div className='button'>

            <button className='btn' onClick={handlelogin} type="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login