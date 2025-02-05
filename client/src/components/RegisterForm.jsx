import React, { useState } from "react";
import axios from "axios"


function RegisterForm(props) {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location,setLocation] = useState("")
  const [status,setStatus] = useState("")
  const [Errors, setErrors] = useState({
    name: '',
    email: '',
    emailformat:'',
    phone:'',
    phoneformat:'',
    password: ''
  });

  const errors = {}
  const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    
  const handleSubmit = (e) => {
    e.preventDefault() 
       
    //Input Validation
    if(name.length==""){
      errors.name = "Name is required!"
    }
    if(email.length==0){
      errors.email = "Email is required!"
    }else if(!validateEmail){
      errors.emailformat = "Email ID format wrong!"
    }
    if(phone.length==0){
      errors.phone = "Phone number is required!"
    }else if(phone.length!=10){
      errors.phonelength = "Invalid Phone Number"
    }
    if(location.length==0){
      errors.location = "Location is required!"
    }
   
    console.log(Errors)
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    // if(Object.keys(errors).length == 0) {
          axios.post('http://localhost:8000/register',
              {name,email,phone,location})
          .then(result=>setStatus(result.data))
          .catch(err=>setStatus(err))
          props.users()
    // }
  }
  return (
    <div className="w-full max-w-lg mx-auto mt-5">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border w-100">
        <h3 className="font-bold text-blue text-center">Registration Form</h3> 
        <div className="mb-4">
          <label className="block text-gray-700 text-start text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input onChange={(e)=>setName(e.target.value)}
           className="shadow border rounded w-full py-2 px-3 text-gray-700" id="name" 
           type="text" placeholder="Name">
           </input>
           {Errors.name && <span style={{color: 'red'}}>{Errors.name}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-start text-sm font-bold mb-2" htmlFor="email">
          Email
          </label>
          <input onChange={(e)=>setEmail(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700" id="email" type="email" placeholder="Email ID"></input>
          {Errors.email && <span style={{ color: 'red' }}>{Errors.email}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-start text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input onChange={(e)=>setPhone(e.target.value)} className="shadow  border rounded w-full py-2 px-3 text-gray-700" id="phone" type="text" placeholder="Phone Number"></input>
          {Errors.phone && <span style={{ color: 'red' }}>{Errors.phone}</span>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-start text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input onChange={(e)=>setLocation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="location" type="text" placeholder="Location"></input>
          {Errors.location && <p style={{ color: 'red' }}>{Errors.location}</p>}
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign Up
          </button>
        </div>
        <div className="text-green-700 mt-2"> 
          {status} 
        </div>
      </form>
  </div>
  );
}

export default RegisterForm