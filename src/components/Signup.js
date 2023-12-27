import React from 'react'
import "../styles/Signup.css"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Signup = () => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate();


  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }

  }, [])

  const collectData = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all the fields");
      return;
    }


    try {
      const userData = {
        name,
        email,
        password,
      };

      const response = await fetch("http://localhost:5001/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const data = await response.json();
      console.warn(data);
      localStorage.setItem("user", JSON.stringify(data))
      navigate('/login');
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className='container'>
      <div className='form'>
        <form>
          <h1 className='heading'>SignUp</h1>
          <p className='para'>First Name</p>
          <input type="text" className='field' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter first name." />

          <p className='para'>Email id</p>
          <input type="text" className='field' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your mail" />

          <p className='para'>Password</p>
          <input type="password" className='field' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your password" />

          <div className='button'>

            <button className='btn' onClick={collectData} type="button">Signup</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Signup