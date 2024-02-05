import React from 'react'
import { useNavigate } from 'react-router-dom';
import logout from '../Images1/logout.png'

export default function Signout() {
    const usenavigate = useNavigate();
    const profile = logout
   function handletoSignOut(){
    sessionStorage.clear(); 
    usenavigate('/')
    window.location.reload();

 }

  return (
    <div>
        <div>
        {/*    <button className='btn btn-success' onClick={handletoSignOut}>SignOut</button>*/}
            <img src={profile} style={{ width: '100px', height: '100px',cursor:'pointer' }} onClick={handletoSignOut} className="logout" alt =""/>
        </div>
    </div>
  )
}
