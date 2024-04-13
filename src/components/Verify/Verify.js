import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Verify() {

    const location = useLocation();
    const email = location.state.email; // Accessing email from location state

    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false); // State to control loading animation

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);


  const [showAnimationMessage, setShowAnimationMessage] = useState(false);

  useEffect(() => {
      let timer;
      if (showAnimationMessage) {
          timer = setTimeout(() => {
              setShowAnimationMessage(false);
              navigate("/login", { state: { message: "Otp verify success fully" } }); // Pass message to login page
          }, 3000);
      }
      return () => clearTimeout(timer);
  }, [showAnimationMessage, navigate]);




  function handleChange(value, index) {
    if (/^\d*$/.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (!value && index > 0) {
        otpBoxReference.current[index - 1].focus(); // Move cursor to previous box if current box is cleared
    } else if (value && index < 5) {
        otpBoxReference.current[index + 1].focus(); // Move cursor to next box if current box is filled
    }
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
   
    const enteredOTP = otp.join("");
    try {
      const response = await axios.post('http://localhost:4500/verify', { email, otp: enteredOTP });
      // console.log(response.data);
      // console.log(enteredOTP);
      setOtpError(null);
      setOtp(new Array(6).fill('')); // Reset OTP fields
      setShowAnimationMessage(true);       
    } catch (error) {
      console.error(error.response.data);
      setOtp(new Array(6).fill('')); // Reset OTP fields
      setOtpError("❌ Incorrect OTP. Fill Form again");
      navigate("/register"); 
    }
  }

  return (
    <article className="w-1/2">
      <p className="text-2xl font-medium text-white mt-12">Enter OTP</p>
      <form onSubmit={handleVerify}>
        <div className='flex items-center gap-4'>
          {otp.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              ref={(ref) => (otpBoxReference.current[index] = ref)}
              className="border w-14 h-14 text-center text-white p-3 rounded-md bg-black focus:border-2 focus:outline-none appearance-none"
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary mt-4">Verify</button>
        {otpError && <p className="text-red-500 mt-2">{otpError}</p>}
      </form>
      {showAnimationMessage && <p className="text-green-500 mt-2">Otp verified successfully. Logging in...</p>}
        </article>
  );
}

export default Verify;
 



