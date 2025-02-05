import React from "react";

function Header() {
   return(
    <header>
        {/* <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
        </nav> */}
        <header className="text-center bg-indigo-600 text-white py-8">
        <h1 className="text-5xl font-bold">Inventory Management</h1>
        <p className="mt-4 text-xl">Easily manage your products, stock, and sales!</p>
      </header>
    </header>
   )
}
export default Header