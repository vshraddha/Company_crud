import React, { useState } from 'react'
import "../styles/AddCompany.css"
import { useNavigate } from 'react-router-dom';


const AddCompany = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);


  const addcompany = async () => {

    console.warn(name, location)
    if (!name || !location) {
      setError(true)
      return false;
    }

    const userid = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch("http://localhost:5001/add-company", {
      method: 'post',
      body: JSON.stringify({ name, location, userid }),
      headers: {
        "content-Type": "application/json"
      }
    });

    result = await result.json();
    navigate("/")

    if (result.status === "success") {


      setSuccessMessage("Product added successfully");
      console.log("Success message set");

    } else {
      setSuccessMessage("");
    }
  }

  return (
    <div className='company'>
      <h2 className='heading1'>Add Company</h2>
      <input type="text" placeholder="Enter Company name" value={name} onChange={(e) => {
        setName(
          e.target.value)
      }} />
      {error && !name && <span className="invalid">Enter valid name</span>}

      <input type="text" placeholder="Enter Company location" value={location} onChange={(e) => {
        setLocation(
          e.target.value)
      }} />

      {error && !location && <span className="invalid">Enter location</span>}

      {successMessage && <div className="success">{successMessage}</div>}


      <button className='buttn' onClick={addcompany}>Add Company</button>

    </div>
  )
}

export default AddCompany