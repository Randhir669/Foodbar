
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { CartProvider } from './Components/FastFood/Pizza';
import Chineese from './Components/Chineese/Chineese';
import NorthIndian from './Components/NorthIndian/NorthIndian';
import SouthIndian from './Components/SouthIndian/SouthIndian';
import Mainpage from './Components/Navbar/Mainpage';
import FastFood from './Components/FastFood/FastFood';
import CartPage from './Components/Navbar/CartPage';
import Footer from './Components/Common/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import { useCart } from './Components/FastFood/Pizza';
import Breadcrumbs from './Components/Common/Breadcrumbs';
import SignIn from './Components/Navbar/SignIn';
import OrderedItems from './Components/Navbar/OrderedItems';
import Signout from './Components/Navbar/Signout';
import Dosa from './Components/SouthIndian/Dosa'
import ScrollToTop from "react-scroll-to-top";

function App(props) {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={true} />

                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <Mainpage />
                </div>
                
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/FastFood' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={true} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <FastFood />
                </div>
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/Chineese' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={true} />
                <hr />
                <Breadcrumbs />
                <Chineese />
              </div>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/SouthIndian' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={true} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <SouthIndian />
                </div>
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/NorthIndian' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={true} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <NorthIndian />
                </div>

              </div>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/FastFood/Pizza' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={true} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <CartProvider cartItems={props.cartItems} />
                </div>
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/Checkout' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={false} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <CartPage />
                </div>
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/SignIn' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={false} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <SignIn />
                </div>
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/OrderedItems' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={false} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <OrderedItems />
                </div>
               
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/SignOut' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={false} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <Signout />
                </div>
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
              </div>
            </>
          }>
          </Route>
          <Route path='/SouthIndian/Dosa' element={
            <>
              <div className='row' style={{ marginBottom: '30px' }}>
                <Navbar status={true} />
                <div className='' style={{ marginTop: '30px' }}>
                  <Breadcrumbs />
                  <Dosa />
                </div>
              </div>
              <ScrollToTop showUnder={160} smooth = 'true' viewBox="0 0 256 256" height='19' width='19'>
                </ScrollToTop>
              <div>
                <Footer />
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
