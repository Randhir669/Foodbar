import React, { useState } from 'react'
import { RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth';
import {auth} from './Firebaase'
import { useNavigate } from 'react-router-dom';


export default function SignIn() {

    const[showlogin,setloginIn] = useState(true)
    const[showsignup,setSignUpIn] = useState(false)
    const[InvalidOTP,setInvalidOTP] = useState(false)
    const[phoneno,setphoneno]= useState("+91")
    const [otp, setotp] = useState('');
    const [final, setfinal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const usenavigate = useNavigate();
   

function handlelogin(){
         
    if (phoneno === "" || phoneno.length < 10) return;
    setIsLoading(true);
    let verify = new RecaptchaVerifier(auth, 'recaptcha-container');;
    signInWithPhoneNumber(auth,phoneno, verify).then((result) => {
        setfinal(result);
        setloginIn(false)
        setSignUpIn(true)
    })
        .catch((err) => {
            console.error("Firebase Sign-In Error:", err);
           
            
        }).finally(() => {
          setIsLoading(false); // Reset loading state
        });


}    

function validateOTP(){
    setIsLoading(true);
    setInvalidOTP(false)
    if (otp === null || final === null)
    return;
    final.confirm(otp).then((result) => {
    usenavigate('/checkout')
    console.log("success",result)
}).catch((err) => {
    setInvalidOTP(true)
}).finally(() => {
  setIsLoading(false);
   // Reset loading state
});
}

function resendOtp(){
    setloginIn(true)
     setSignUpIn(false)
}
    return (
        <div className='offset-lg-4 col-lg-4'>

            <div className="card" style={{ boxShadow: '1px 2px 9px #6c757d', marginTop: '100px', marginBottom: '15px' }}>

                {showlogin && <>
                    <div className='card-header'>
                        <h3 className="text-center">Login</h3>
                    </div>
                    <div className="card-body">

                        <div className="form-group mt-3 " style={{ height: '' }}>

                            <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Phone No' value={phoneno} onChange={e=>setphoneno(e.target.value)} required className="form-control" />

                            <div className="my-1" id="recaptcha-container"></div>
                        </div>

                        <div className="form-group ">
                            <button type="button" className="btn my-3" onClick = {handlelogin} style={{ width: '99%', backgroundColor: '#fc8019', color: 'white', height: '8vh' }}>
                            {isLoading ? <div className="spinner"></div> : "Login"}
                            </button>
                            <h6 className='cart_cost'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</h6>
                        </div>

                    </div>
                </>}
                {false &&
                    <>
                        <div className='card-header'>
                            <h3 className="text-center">Sign Up</h3>
                        </div>
                        <div className="card-body">

                            <div className="form-group mt-3 " style={{ height: '' }}>

                                <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Phone No' required className="form-control my-1" />
                                <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Name' required className="form-control my-1" />
                                <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Email' required className="form-control my-1" />

                            </div>

                            <div className="form-group ">
                                <button type="button" className="btn my-3" style={{ width: '99%', backgroundColor: '#fc8019', color: 'white', height: '8vh' }}><b>Continue</b>
                                </button>
                            </div>

                        </div>
                    </>
                }

       {showsignup && <>
                    <div className='card-header'>
                        <h3 className="text-center">Enter OTP</h3>
                        <h6 className='cart_cost'>We've sent an OTP to your phone number.</h6>
                    </div>
                    <div className="card-body">

                        <div className="form-group mt-3 " style={{ height: '' }}>

                            <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Phone No' value={phoneno} required className="form-control" />
                            <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='One Time Password' value={otp} onChange={e=>setotp(e.target.value)} required className="form-control my-2" />
                             <h6 className='cursor' style={{color:'blue'}} onClick={resendOtp}>Resend OTP</h6>             {InvalidOTP && <h6 style={{color:'red'}}>Invalid OTP</h6>}
                        </div>

                        <div className="form-group ">
                            <button type="button" className="btn my-3" onClick = {validateOTP} style={{ width: '99%', backgroundColor: '#fc8019', color: 'white', height: '8vh' }}>
                            {isLoading ? <div className="spinner"></div> : "Verify OTP"}
                            </button>
                        </div>

                    </div>
                </>}
            </div>
        </div>
    )
}
