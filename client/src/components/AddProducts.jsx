import React, { useState } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';

function AddProducts(props) {
  const [name,setName] = useState("")
  const [quantity,setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [status,setStatus] = useState("")
  const [Errors, setErrors] = useState({
    name: '',
    quantity:'',
    price:''
  });

  const errors = {}  
  const handleSubmit = (e) => {
    e.preventDefault() 
       
    //Input Validation
    if(name.length==""){
      errors.name = "Product name is required!"
    }
    if(quantity.length==0){
      errors.email = "Quantity is required!"
    }
    if(price.length==0){
      errors.phone = "Price is required!"
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    axios.post('http://localhost:8000/addProduct',
              {name,quantity,price})
          .then(result=>setStatus(result.data))
          .catch(err=>setStatus(err))
  }
  return (
    <> 
      <Link to="/" className='text-indigo-500 font-bold decoration-none hover:font-bold mt-4 ml-6'>Back to Stock </Link>
      <div className="w-full max-w-lg mx-auto mt-5 mb-5">
      <h3 className="font-bold text-blue text-center text-xl">Add New Product Details</h3> 
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 border border-gray-300 w-100">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-start text-sm font-bold mb-2" htmlFor="name">
            Product Name
          </label>
          <input type='text' placeholder="Enter Product Name" onChange={(e)=>setName(e.target.value)}
           className="shadow border border-gray-400 rounded w-full py-2 px-3 text-gray-700" id="name" 
          >
           </input>
           {Errors.name && <span style={{color: 'red'}}>{Errors.name}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-start text-sm font-bold mb-2" htmlFor="email">
          Quantity
          </label>
          <input type="number" placeholder="No of Units" onChange={(e)=>setQuantity(e.target.value)} 
              className="shadow border border-gray-400 rounded w-full py-2 px-3 text-gray-700" ></input>
          {Errors.email && <span style={{ color: 'red' }}>{Errors.email}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-start text-sm font-bold mb-2" htmlFor="phone">
            Price
          </label>
          <input type='number' placeholder="Unit price" onChange={(e)=>setPrice(e.target.value)} 
          className="shadow  border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
          id="phone"></input>
          {Errors.phone && <span style={{ color: 'red' }}>{Errors.phone}</span>}
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Add New Product
          </button>
        </div>
        <div className="text-green-700 font-bold mt-4 text-center text-sm"> 
          {status} 
        </div>
      </form>
     </div>
    </>
  
  );
}

export default AddProducts