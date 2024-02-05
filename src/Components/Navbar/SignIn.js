import React, { useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../Common/Firebaase'
import { useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'
import { Toaster, toast } from "react-hot-toast";



export default function SignIn() {

    const [showlogin, setloginIn] = useState(true)
    const [showsignup, setSignUpIn] = useState(false)
    const [InvalidOTP, setInvalidOTP] = useState(false)
    const [showotpmodal, setshowotpmodal] = useState(false)
    const [phoneno, setphoneno] = useState('+91')
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    

    const [otp, setotp] = useState('');
    const [final, setfinal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
   // const[currentuser,setcurrentuser] = useState('')
  //  const [newuser, setnewuser] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isDisabled, setIsDisabled] = useState(true)
    const[authname,setauthname]=useState('')
    const[authphoneno,setauthphoneno]=useState('')
    const[toaster,settoaster] = useState(false)
    const usenavigate = useNavigate();
    var signinuser = []
    const url = 'https://ooj2f1apol.execute-api.us-west-2.amazonaws.com'


    async function handlelogin(status) {
        settoaster(true)
        setProgress(progress + 10)
        setIsLoading(true);
        console.log("inside login")
        if (phoneno === "" || phoneno.length < 10){
            return;
        }           
        var newuserexist = status
        if (!newuserexist) {
            var userExists = await checkUser(phoneno);
        }
        debugger
        if (userExists || newuserexist) {
            let verify = new RecaptchaVerifier(auth, 'recaptcha-container');;
            try {
                signInWithPhoneNumber(auth, phoneno, verify, { timeout: 50000 })
                  .then((result) => {
                    setfinal(result);
                    setloginIn(false);
                    setProgress(progress + 30);
                    toast.success("OTP Sended Sucessfully");
                    setshowotpmodal(true);
                  })
                  .catch((err) => {
                   
                  toast.error(err);
                    setProgress(100);
                  })
                  .finally(() => {
                    setIsLoading(false); // Reset loading state
                  });
              } catch (err) {    
                if (err.code === 'TIMEOUT_ERROR') {
                    toast.error(err);
                } else {
                    toast.error("Authentication failed:");
                   // alert("Authentication failed:")
        
                }
                setProgress(100);
              } 

        } else {
            setloginIn(false)
            setSignUpIn(true)

        }
    }

    function handletoPhone(event){
        const phoneno = event.target.value
        setphoneno(phoneno)
        if(phoneno.length===13){
             
            if(/^\+?[0-9]+$/.test(phoneno)){
                setIsDisabled(false)
            }else{
                setIsDisabled(true)
            }
                
        }else{
            setIsDisabled(true)
        }

    }

    function validateOTP() {

        setProgress(progress + 40)   
        setIsLoading(true);
        setInvalidOTP(false)
        if (otp === null || final === null)
            return;
            try{
        final.confirm(otp).then((result) => {
            setProgress(100)
            if(authname==''){
                sessionStorage.setItem('username',name)
                sessionStorage.setItem('phone',phoneno)

            }else{
                sessionStorage.setItem('username',authname)
                sessionStorage.setItem('phone',authphoneno)
            }
            usenavigate('/')
        }).catch((err) => {
            setInvalidOTP(true)
            console.error("Error confirming OTP:", err);
        }).finally(() => {
            setIsLoading(false);
            setProgress(100)
            // Reset loading state
        });
    }catch(error){
      console.error("Unexpected error:", error);
    }
    }

    function resendOtp() {
        setloginIn(true)
        setshowotpmodal(false)
    }


    async function handleButtonClick() {
       if(addusertodb()) {
        setloginIn(true)
        setSignUpIn(false)

        setTimeout(() => {
            handlelogin(true)
            
        }, 100);
        
            setIsLoading(true);
       }else{
               //  usenavigate('/Checkout')
       }
     
    }

    // Button click handler

    async function addusertodb() {
      console.log("phone",phoneno)
        var obj = {}
        obj.phone = phoneno??0
        obj.fullname = name
        obj.email = email
        obj.id = Math.floor(Math.random() * (1000 - 1)) + 1;

        try {
            const response = await fetch(url+'/addusers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                const data = await response.json();
              //  setcurrentuser(obj);
                sessionStorage.setItem('username', name)
                sessionStorage.setItem('phone', phoneno)
                return true;
            } else {
                console.error('Failed to add user');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }

    }

    const checkUser = async (phoneNumberToCheck) => {
        console.log("Inside checkuser")
        try {
            const response = await fetch(`${url}/users/${phoneNumberToCheck}`); // Replace with your actual API endpoint
            if (response.ok) {
                const data = await response.json();
                signinuser = data
                if (data.length !== 0) {
                    setauthname(data[0].fullname)
                    setauthphoneno(data[0].phone)
                    return true;
                }
                else
                    return false
            } else {
                console.error('Failed to fetch user');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='offset-lg-4 col-lg-4'>
          
            <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        {/* <>{toaster&&<Toaster toastOptions={{ duration: 4000 }} />}</>   */}
            <div className="card card_shadow" style={{marginTop: '100px', marginBottom: '15px' }}>
                {showlogin && <>
                    <div className='card-header'>
                        <h3 className="text-center">Login</h3>
                    </div>
                    <div className="card-body">

                        <div className="form-group mt-3 " style={{ height: '' }}>

                            <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Phone No' value={phoneno} onChange={handletoPhone} required className="form-control" />

                            <div className="my-1" id="recaptcha-container"></div>
                        </div>

                        <div className="form-group ">
                            <button type="button"  disabled={isDisabled} className="btn my-3" onClick={e => handlelogin(false)} style={{ width: '99%', backgroundColor: '#fc8019', color: 'white', height: '8vh' }}>
                                {isLoading ? <div className="spinner"></div> : <b>Login➞</b>}
                            </button>
                            <h6 className='cart_cost'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</h6>
                        </div>

                    </div>
                </>}
            <>    {showsignup &&
                    <>
                        <div className='card-header'>
                            <h3 className="text-center">Sign Up</h3>
                        </div>
                        <div className="card-body">

                            <div className="form-group mt-3 " style={{ height: '' }}>

                                <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Phone No' value={phoneno} required className="form-control my-1" />
                                <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Name' value={name} onChange={e => setname(e.target.value)} required className="form-control my-1" />
                                <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Email' value={email} onChange={e => setemail(e.target.value)} required className="form-control my-1" />

                            </div>

                            <div className="form-group ">
                                <button type="button" className="btn my-3" onClick={handleButtonClick} style={{ width: '99%', backgroundColor: '#fc8019', color: 'white', height: '8vh' }}>
                                    {isLoading ? <div className="spinner"></div> : "Continue"}
                                </button>
                            </div>

                        </div>
                    </>
                }</>

                <>{showotpmodal && <>
                    <div className='card-header'>
                        <h3 className="text-center">Enter OTP</h3>
                        <h6 className='cart_cost'>We've sent an OTP to your phone number.</h6>
                    </div>
                    <div className="card-body">

                        <div className="form-group mt-3 " style={{ height: '' }}>

                            <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='Phone No' value={phoneno} onChange={e => setphoneno(e.target.value)} required className="form-control" />
                            <input type="text" style={{ width: '99%', height: '8vh' }} placeholder='One Time Password' value={otp} onChange={e => setotp(e.target.value)} required className="form-control my-2" />
                            <h6 className='cursor' style={{ color: 'blue' }} onClick={resendOtp}>Resend OTP</h6>             {InvalidOTP && <h6 style={{ color: 'red' }}>Invalid OTP</h6>}
                        </div>

                        <div className="form-group ">
                            <button type="button" className="btn my-3" onClick={validateOTP} style={{ width: '99%', backgroundColor: '#fc8019', color: 'white', height: '8vh' }}>
                                {isLoading ? <div className="spinner"></div> : "Verify OTP"}
                            </button>
                        </div>

                    </div>
                </>}</>
            </div>
        </div>
    )
}
