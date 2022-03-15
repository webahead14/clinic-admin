import React, { useState } from 'react';
import style from './style.module.css'
export default function Marketing() {
    const [Clinic, setClinic] = useState("");
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Country, setCountry] = useState("");
    const [EmployeesAmount, setEmployeesAmount] = useState(0);
    const [How, setHow] = useState("");
     
    return (
        <div>
            <form onSubmit={function () {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify( 'Clinic:'[Clinic], 'Name:'[Name], 'Phone:'[Phone], 'Country:'[Country], 'EmployeesAmount:'[EmployeesAmount], 'How did know about us:'[How])
                    };
                    fetch('https://reqres.in/api/users', requestOptions)
                        .then(response => response.json())
                }}>
                <div className={style.fields}>
                <h2 className={style.ClinicName}>Clinic name</h2>
                <input type="text" value={Clinic} onChange={(e)=>setClinic(e.target.value)} />
                <h2 className="ContactcName">Contact name</h2>
                <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} />
                <h2 className="ContactPhone">Contact Phone</h2>
                <input type="text" onChange={(e)=>setPhone(e.target.value)} />
                <h2 className="Country">Country</h2>
                <input type="text" onChange={(e)=>setCountry(e.target.value)} />
                <h2 className="EmployeesAmount">Employees amount</h2>
                <input type="number" className={style.numInput} onChange={(e)=>setEmployeesAmount(e.target.value)} />
                <h2 className="How">How did you know about us?</h2>
                <input type="text" className={style.howInput} onChange={(e)=>setHow(e.target.value)} />
                </div>
                <div className={style.SubButton}> 
                <button type="submit">Submit</button>
                </div>
              </form>
        </div>
        )
}