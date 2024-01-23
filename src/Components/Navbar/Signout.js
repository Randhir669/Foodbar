import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signout() {
    const usenavigate = useNavigate();
    //var location = "http://localhost:3001/"
   function handletoSignOut(){
    sessionStorage.clear(); 
    usenavigate('/')
    window.location.reload();

 }

  return (
    <div>
        <div>
            <button className='btn btn-success' onClick={handletoSignOut}>SignOut</button>
        </div>
    </div>
  )
}
