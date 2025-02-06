import './App.css'
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header';
import Footer from './components/Footer';
import AddProducts from './components/AddProducts';
import EditProduct from './components/EditProduct';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <main className='bg-gray-100 flex flex-col'>
            <Routes> 
              <Route path="/" element={<Home />} /> 
              <Route path="/addproducts" element={<AddProducts />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />
            </Routes>
        </main>
        <Footer/>
      </Router>
    </>
  )
}
export default App

