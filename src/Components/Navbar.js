import React, { useContext, useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs';
import {BiSolidOffer} from 'react-icons/bi'
import {IoHelpBuoyOutline} from 'react-icons/io5'
import{FiUser} from 'react-icons/fi'
import {BsCart} from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';




export default function Navbar() {
    const usenavigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [totalcart,settotalcart] = useState(0)
  //  const isLoading = useSelector((state) => state.cart.isLoading);
  useEffect(() => {
    counttotalcart()

},  [cartItems]);

function counttotalcart(){
    const count = cartItems.reduce((total, item) => total + item.cart, 0);
    settotalcart(count)
}

  function handlecart(){

    console.log("All cartItems",cartItems)
    usenavigate('/Checkout')
   
  }

  function handletohome(){
    usenavigate('/')
  }

  function handletosignIn(){

    usenavigate('/SignIn')
   
  }


  return (
    <div>
        
        <nav className="navbar  navbar-expand-lg" style = {{height:'100px'}}>
    <div className="container-fluid">
      <a className="navbar-brand navfont space" href="#" onClick={handletohome}>
      <img src="https://i.pinimg.com/originals/b3/8a/a1/b38aa1b21050b0e769a97eb751d12829.png" alt="" style = {{height:'90px',width:'100px'}}  className="d-inline-block zoom-image"/>
        &nbsp;Foodbar</a>
        <ul className="navbar-nav ml-auto mb-6 mb-lg-0">
          <li className="nav-item navfont space ">
            <a className="nav-link active" style = {{color:'#fc8019'}} aria-current="page" href="#"><BsSearch/>&nbsp;Search</a>
          </li>
          <li className="nav-item navfont space">
            <a className="nav-link active" href="#"><BiSolidOffer/>&nbsp;Offers</a>
          </li>
          <li className="nav-item navfont space">
            <a className="nav-link active" href="#"><IoHelpBuoyOutline/>&nbsp;Help</a>
          </li>
          <li className="nav-item navfont space">
            <a className="nav-link active" href="#" onClick={handletosignIn}><FiUser/>&nbsp;SignIn</a>
          </li>
          <li className="nav-item navfont space">

            <a className="nav-link active" href="#" onClick={handlecart}><BsCart/>&nbsp;Cart({totalcart})</a>
          </li>
        </ul>  
    </div>
  </nav>
  
  </div>
  
  )
}
