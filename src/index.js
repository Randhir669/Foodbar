import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Components/Navbar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Components/Reducers/Combine'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: rootReducer,
  // Additional middleware or options can be configured here
});

root.render(
 
    <Provider store={store}>
    <App />
    </Provider>
    
  
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
