
import './App.css';
import Navbar from './Components/Navbar';
import {CartProvider} from './Components/Pizza';
import Chineese from './Components/Chineese';
import NorthIndian from './Components/NorthIndian';
import SouthIndian from './Components/SouthIndian';
import Mainpage from './Components/Mainpage';
import FastFood from './Components/FastFood';
import CartPage from './Components/CartPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCart } from './Components/Pizza';
import Breadcrumbs from './Components/Breadcrumbs';
import SignIn from './Components/SignIn';

function App(props) {
  return (
    
    <div className="App">
        <BrowserRouter>      
        <Routes>
          <Route path='' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
            <Navbar/>
            <hr/>
            <Breadcrumbs />
            <div className='bg-light'>
            <Mainpage/>
            </div>
            
            </div>
            </>
        }>
      </Route>
      <Route path='/FastFood' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
            <Navbar/>
            <hr/>
            <Breadcrumbs />
            <div className='bg-light'>
            <FastFood/>
            </div>
            </div>
            </>
        }>
      </Route>
      <Route path='/Chineese' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
            <Navbar/>
            <hr/>
            <Breadcrumbs />
            <Chineese/>
            </div>
            </>
        }>
      </Route>
      <Route path='/SouthIndian' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
            <Navbar/>
            <hr/>
            <Breadcrumbs />
            <SouthIndian/>
            </div>
            </>
        }>
      </Route>
      <Route path='/NorthIndian' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
            <Navbar/>
            <hr/>
            <Breadcrumbs />
            <NorthIndian/>
            </div>
            </>
        }>
      </Route>
      <Route path='/FastFood/Pizza' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
           <Navbar/>
            <hr/>
            <Breadcrumbs />
            <CartProvider cartItems={props.cartItems} />
            </div>
            </>
        }>
      </Route>
      <Route path='/Checkout' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
           <Navbar/>
            <hr/>
            <Breadcrumbs />
            <CartPage/>
            </div>
            </>
        }>
      </Route>
      <Route path='/SignIn' element={
            <>
            <div className='row' style = {{marginBottom:'30px'}}>
           <Navbar/>
            <hr/>
            <Breadcrumbs />
            <SignIn/>
            </div>
            </>
        }>
      </Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems, // Map cartItems from Redux state to props
});

// Connect App component to Redux store
export default connect(mapStateToProps)(App);
