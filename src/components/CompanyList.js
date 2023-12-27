
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "../styles/CompanyList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const CompanyList = () => {
    const [comp, setComp] = useState([])

    const getcompanies = async () => {
        let result = await fetch("http://localhost:5001/companies")
        result = await result.json();
        setComp(result);
    }
    console.warn(comp)

    useEffect(() => {
        getcompanies();
    }, [])

    const deletecompany = async (id) => {
        let result = await fetch(`http://localhost:5001/company/${id}`, {
            method: "Delete"
        });
        result = await result.json()
        if (result) {
            getcompanies();
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5001/search/${key}`);
            result = await result.json();
            if (result) {
                setComp(result)
            }

        }
        else {
            getcompanies();
        }
    }

    return (
        <div className='complist'>
            <h2 className='heading'>Company List</h2>
            <input className='search' type="text" placeholder='search company' onChange={searchHandle} />

            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Location</li>
                <li>Operation</li>

            </ul>

            {
                comp.length > 0 ? comp.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.location}</li>
                        <li><button onClick={() => deletecompany(item._id)}> <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /></button>
                            <span style={{ marginRight: '8px' }}></span>
                            <Link to={"/update/" + item._id} >  <FontAwesomeIcon icon={faEdit} style={{ color: 'white' }} /></Link></li>
                    </ul>

                ) : <h1>No Company found</h1>
            }

        </div>
    )
}

export default CompanyList