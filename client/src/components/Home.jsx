
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';



function Home(){
  
  const [products,setProducts] = useState([])

  const viewProducts = async ()=>{
     try{
        const response = await axios.get('http://localhost:8000/viewProducts')
        setProducts(response.data)
     }catch(error){
        console.log(error)
     }
  }
  useEffect(()=>{
       viewProducts()
  },[]) 

  const handleDelete = async (id)=>{
    const isConfirmed = confirm('Are you sure you want to delete this product?')
    if(isConfirmed) {
        try {
            const response = await axios.delete(`http://localhost:8000/deleteProduct/${id}`)
            //Toast may be here
            toast.success(response.data);
            viewProducts()
        }
        catch(error){
            console.log(error)
        }
      }
    }

  return (
    <div>
      <div className="flex flex-col justify-center mt-4 p-1">
      <h1 className="text-2xl text-center font-bold ml-1">Stock Details </h1>
      {/* <div className='flex flox-row items-end mb-4'> */}
     
      {/* </div> */}
      <table className="min-w-[75%] max-w-[80%] m-auto mb-8 table-auto border border-gray-300 bg-white border-collapse shadow-lg">
        <caption className='text-right mb-4 mt-6 text-xl'> 
            <Link to="/addproducts" className='text-indigo-500 px-4 mb-4 text-right font-bold decoration-none hover:font-bold'>Add New Product<i className="fa fa-arrow-right ml-2" aria-hidden="true"></i> </Link>
        </caption>
        <thead className="bg-green-200 text-xl py-2 px-4 border border-gray-700">
          <tr className='font-semibold text-black-500'>
           <th className="border border-gray-700 py-2 px-4">Sl.No</th>
            <th className="border border-gray-700 py-2 px-4">Product Name</th>
            <th className="border border-gray-700 py-2 px-4">Quantity</th>
            <th className="border border-gray-700 py-2 px-4">Price</th>
            <th className="border border-gray-700 py-2 px-4" colspan='2'>Actions</th>
          </tr>
        </thead>
        <tbody>
              {products.map((item,index)=>{
                  return(
                    <tr  className="text-lg text-gray-700" key={index} >
                            <td className="border border-gray-700 py-2 px-4 ">{index+1}</td>
                            <td className="border border-gray-700 py-2 px-4">{item.name}</td>
                            <td className="border border-gray-700 py-2 px-4">{item.quantity}</td>
                            <td className="border border-gray-700 py-2 px-4">{item.price}</td>
                            <td className="border border-gray-700 py-2 px-4">
                            <Link to={`/editproduct/${item._id}`} className="text-indigo-600 hover:text-indigo-800 mr-4">
                                <i className="fas fa-edit text-lg"></i>
                            </Link> 
                            </td>
                            <td  className="border border-gray-700 py-2 px-4">                       
                            <button onClick={() => handleDelete(item._id)} className="text-red-600 bg-white hover:text-red-800">
                                <i className="fas fa-trash text-lg"></i>
                            </button>
                            </td>
                    </tr>
                  )
              })}
        </tbody>
      </table>
      <ToastContainer position='top-left' autoClose={3000} hideProgressBar={false} closeOnClick={true} transition={Bounce} theme="dark"/>
      </div>
    </div>
  );
};

export default Home;
