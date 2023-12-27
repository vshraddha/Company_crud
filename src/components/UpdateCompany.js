import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "../styles/UpdateCompany.css"

const UpdateCompany = () => {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCompanyDetail();

  }, [])

  const getCompanyDetail = async () => {
    let result = await fetch(`http://localhost:5001/company/${params.id}`);
    result = await result.json();
    // console.warn(result)
    setName(result.name)
    setLocation(result.location)

  }

  const updatecompany = async () => {

    console.warn(name, location)
    let result = await fetch(`http://localhost:5001/company/${params.id}`, {
      method: 'put',
      body: JSON.stringify({ name, location }),
      headers: {
        'Content-Type': "application/json"

      }


    })

    result = await result.json();
    console.warn(result)
    navigate("/")


  };

  return (
    <div className='update'>
      <h2 className='heading1'> Update Company</h2>


      <input type="text" placeholder="Enter Company name" value={name} onChange={(e) => {
        setName(
          e.target.value)
      }} />


      <input type="text" placeholder="Enter Company Location" value={location} onChange={(e) => {
        setLocation(
          e.target.value)
      }} />

      <button className='buttn' onClick={updatecompany}>Update Company</button>
    </div>
  )
}

export default UpdateCompany