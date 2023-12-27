import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const auth = localStorage.getItem('user')
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login')

  }

  return (
    <div className='nav'>
      {auth ? <ul className='ul' >
        <li><Link to="/">Companies</Link></li>
        <li><Link to="/add" >Add Company</Link></li>
        <li><Link to="/update" >Update Company</Link></li>
        <li><Link onClick={logout} to="/signup" >LogOut</Link></li>
      </ul> :

        <ul className='ul'>

          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login</Link></li>

        </ul>
      }

    </div>
  )
}

export default Navbar