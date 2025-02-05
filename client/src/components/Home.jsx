
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home(){
  
  const [products,setProducts] = useState([])

  const viewProducts = ()=>{
    axios.get('http://localhost:8000/viewProducts')
     .then(result=>setProducts(result.data))
     .catch(err=>console.log(err))
     console.log(products)
  }
  useEffect(()=>{
       viewProducts()
  },[]) 

  const handleDelete = (id)=>{
   console.log(id)
    axios.delete(`http://localhost:8000/deleteProduct/${id}`)
     .then(result=>{
       console.log('deleted')
       //viewProducts()
     })
     .catch(err=>console.log(err))
   }

  return (
    <div>
      <div className="flex flex-col justify-center mt-12 p-4">
      <div className='flex flox-row justify-between mb-4'>
      <p className="text-xl text-left font-bold ml-1">Stock Details </p>
      <Link to="/addproducts" className='text-indigo-500 px-4 font-bold decoration-none hover:font-bold'>Add Products </Link>
      </div>
      <table className="min-w-[90%] mb-8 table-auto border border-gray-300 bg-white border-collapse shadow-lg">
        <thead className="bg-green-200">
          <tr className=''>
          <th className="border py-2 px-4 text-left text-lg font-semibold text-gray-700">Sl.No</th>
            <th className="border py-2 px-4 text-left text-lg font-semibold text-gray-700">Product Name</th>
            <th className="border py-2 px-4 text-left text-lg font-semibold text-gray-700">Quantity</th>
            <th className="border py-2 px-4 text-left text-lg font-semibold text-gray-700">Price</th>
            <th className="border py-2 px-4 text-left text-lg font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
              {products.map((item,index)=>{
                  return(
                    <tr  className="border">
                            <td className="border py-1 px-4 text-sm text-gray-800">{index+1}</td>
                            <td className="border py-1 px-4 text-sm text-gray-800">{item.name}</td>
                            <td className="border py-1 px-4 text-sm text-gray-800">{item.quantity}</td>
                            <td className="border py-1 px-4 text-sm text-gray-800">{item.price}</td>
                            <td className="border py-1 px-4 text-sm text-gray-800">
                            <Link to='/editproduct' className="text-indigo-600 hover:text-indigo-800 mr-4">
                            <i className="fas fa-edit text-lg"></i>
                            </Link>
                            <button onClick={handleDelete(item.id)} className="text-red-600 bg-white hover:text-red-800">
                                <i className="fas fa-trash text-lg"></i>
                            </button>
                            </td>
                    </tr>
                  )
              })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Home;
