import { useEffect, useState } from 'react';
import './App.css'
import './index.css';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header';
import Footer from './components/Footer';
import AddProducts from './components/AddProducts';
import EditProduct from './components/EditProduct';



function App() {


  
  const [userid,setUserId] = useState()
  const [isEditModalOpen,setIsEditModalOpen] = useState(false)
  const EditOpenModal = (id) => {
    setIsEditModalOpen(true)
    setUserId(id)
  }
  const EditCloseModal = () => {
    setIsEditModalOpen(false);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (id) => {
    setIsModalOpen(true)
   }
  const closeModal = (id) => {
    setIsModalOpen(false);
  }
  
  
  const handleDelete = async (id)=>{
   await axios.get(`http://localhost:8000/delete/${id}`)
    .then(result=>{
      console.log(result.data)
      getAllUsers()
    })
    .catch(err=>console.log(err))
  }

  return (
    <>
      <Router>
        <Header/>
        <main className='bg-gray-100 flex flex-col'>
            <Routes> 
              <Route path="/" element={<Home />} /> 
              <Route path="/addproducts" element={<AddProducts />} />
              <Route path="/editproduct" element={<EditProduct />} />
            </Routes>
        </main>
        <Footer/>
      </Router>
    </>
  )
}
export default App

