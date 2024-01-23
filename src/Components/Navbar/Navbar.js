import React, { useContext, useEffect, useState, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { BiSolidOffer } from 'react-icons/bi'
import { IoHelpBuoyOutline } from 'react-icons/io5'
import { FiUser } from 'react-icons/fi'
import { BsCart } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';




export default function Navbar(Props) {
  
  const usenavigate = useNavigate();
  debugger
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [totalcart, settotalcart] = useState(0)
  const [currentuser, setcurrentuser] = useState('SignIn')
  const [serachtext,setsearchtext] = useState('')
  const users = useSelector((state) => state.cart.users)
  const username = sessionStorage.getItem('username');
  const [showsearch,setshowsearch]=useState(Props.status)
  //  const isLoading = useSelector((state) => state.cart.isLoading);

  const AllItems =['Pizza','Dosa','Burger','Idli','Biryani']

  useEffect(() => {


    console.log("username", username)
    if (username != null) {
      setcurrentuser(username)
    }

    counttotalcart()

  }, [cartItems, username]);

  function counttotalcart() {
    const count = cartItems.reduce((total, item) => total + item.cart, 0);

    if (users.length != 0) { }
    settotalcart(count)

    console.log("Users", users)
  }

  function handlecart() {

    console.log("All cartItems", cartItems)
    // console.log("All -- users",users[0].fullname)
    usenavigate('/Checkout')

  }

  function handletohome() {
    usenavigate('/')
  }

  function handletosignIn() {
    if (currentuser == 'SignIn') {
      usenavigate('/SignIn')


    } else {

      usenavigate('/Signout')
    }


  }

  function handleorderditems() {
    usenavigate('/OrderedItems')
  }

  function filterItems(event){
    debugger
    const searchText = event.target.value;
    setsearchtext(searchText);
     // Update the search query state
    if(searchText!=""){
        /*const filteredFiles = AllItems.filter(file =>
            file.toLowerCase().includes(searchText.toLowerCase())
        );*/
          if(searchText=='Pizza'||searchText=='pizza'||searchText=='pizz'||searchText=='Pizz'){
            usenavigate('/FastFood/Pizza')
          }
          if(searchText=='Dosa'||searchText=='dosa'){
            usenavigate('/SouthIndian/Dosa')
          }
          console.log(searchText);
         // setoptions(filteredFiles)
    }else{
        console.log(searchText);
        usenavigate('/')
    }
   

}


  return (
    <div>

      <nav className="navbar  navbar-expand-md bd-navbar" >
        <div className="container-fluid">
          <a className="navbar-brand navfont space" href="#" onClick={handletohome}>
            <img src="https://iconape.com/wp-content/png_logo_vector/food-bar-logo.png" alt="" style={{ height: '90px', width: '100px' }} className="d-inline-block zoom-image" />
            &nbsp;</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bdNavbar"
            aria-controls="bdNavbar"
          

          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="bdNavbar" >
            <ul className="navbar-nav  bd-navbar justify-content-end ml-auto mb-6 mb-lg-0">
              <li className="nav-item navfont space ">
                
              { Props.status &&   <input className="form-control mr-sm-2" type="search"  onChange = {filterItems} placeholder="Search" aria-label="Search" >
                  </input>}
              {/*  <a className="nav-link active" style={{ color: '#fc8019' }} aria-current="page" href="#"><BsSearch />&nbsp;Search</a>*/}
              
              </li>
              <li className="nav-item navfont space">
                <a className="nav-link active" href="#" onClick={handleorderditems}><BiSolidOffer />&nbsp;Orders</a>
              </li>
             {/* <li className="nav-item navfont space">
                <a className="nav-link active" href="#"><IoHelpBuoyOutline />&nbsp;Help</a>
              </li>*/}
              <li className="nav-item navfont space">
                <a className="nav-link active" href="#" onClick={handletosignIn}><FiUser />&nbsp;{currentuser}</a>
              </li>
              <li className="nav-item navfont space">

                <a className="nav-link active" href="#" onClick={handlecart}><BsCart />&nbsp;Cart <button className='btn btn-sm btn-success'>{totalcart}</button></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>

  )
}
