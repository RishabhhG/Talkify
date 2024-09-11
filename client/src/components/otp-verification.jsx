'use client'

import { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiClient } from '@/lib/api-client'
import { VERIFY_OTP } from '@/utils/constant'
import { useNavigate } from 'react-router-dom';

export function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(Number(element.target.value))) return false

    const newOtp = [...otp]
    newOtp[index] = element.target.value.substring(element.target.value.length - 1)
    setOtp(newOtp)

    // Move to next input if current field is filled
    if (element.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('')
    const newOtp = [...otp]
    
    for (let i = 0; i < 6; i++) {
      if (pastedData[i]) {
        newOtp[i] = pastedData[i]
      }
    }
    
    setOtp(newOtp)
    
    // Focus the next empty field or the last field if all are filled
    const nextEmptyIndex = newOtp.findIndex(val => val === '')
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleotp = async()=>{
    if (otp.some(val => val === '')) {
      toast.error('Invalid OTP');
      return false;
    }

    const response = await apiClient.post(VERIFY_OTP, { otp: otp.join('')});
    if(response.data.success){
      toast.success('Signup successful!')
      navigate('/profile');
    }
  }

  return (
    (<div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-purple-400">
          Verify OTP <span className="text-pink-400">✨</span>
        </h1>
        <p className="text-center text-gray-300">
          Enter the 6-digit code sent to your device
        </p>
        <div className="flex justify-center space-x-2">
          {otp.map((data, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-xl bg-gray-700 border-purple-400 focus:border-pink-400 text-white"
              value={data}
              onChange={e => handleChange(e, index)}
              onPaste={handlePaste}
              ref={el => inputRefs.current[index] = el} />
          ))}
        </div>
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300" onClick = {handleotp}>
          Verify
        </Button>
      
      </div>
    </div>)
  );
}