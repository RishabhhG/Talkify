'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock } from 'lucide-react'
import { toast } from "sonner"
import { apiClient } from '@/lib/api-client'
import { SIGNUP_ROUTE } from '@/utils/constant'




function GlossyDarkAuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setemail] = useState("");
  const[password, setpassword] = useState("");
  const[confirm_password, setconfirm_password] = useState("");
  const navigate = useNavigate();

  const validatesignup = ()=>{

    if(!email.length){
      toast.error('Email is required');
      return false;
    }

    if(!password.length){
      toast.error('password is required');
      return false;
    }

    if(password !== confirm_password){
      toast.error('password and confirm password should be same');
      return false;
    }
    return true;

  }

  const handlelogin = async()=>{

  }

  const handlesignup = async()=>{
    if(validatesignup()){
      const response = await apiClient.post(SIGNUP_ROUTE, {email, password});
      console.log(response);

      if(response.data.success){
        toast.success('Signup successful! Check your email for the OTP.')
        navigate('/otp-verification');
      }
    }
  }

  return (
    (<div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-black"
      style={{backgroundImage: `url('')`}}>
      <div
        className="w-full max-w-md p-8 space-y-8 bg-black bg-opacity-50 backdrop-blur-xl rounded-lg shadow-2xl border border-purple-500/20">
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome ✨
          </h1>
          <p className="text-purple-300">Join the best chat experience today!</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white transition-all duration-300">
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white transition-all duration-300">
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  size={18} />
                <Input
                  type="email"
                  placeholder="Email" 
                  value = {email}
                  onChange = {(e)=>setemail(e.target.value)}
                  className="pl-10 bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 text-white placeholder-gray-400" />
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  size={18} />
                <Input
                  type="password"
                  placeholder="Password"
                  value = {password}
                  onChange = {(e)=>setpassword(e.target.value)}
                  className="pl-10 bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 text-white placeholder-gray-400" />
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300" onClick={handlelogin}>
              Login
            </Button>
          </TabsContent>
          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  size={18} />
                <Input
                  type="email"
                  placeholder="Email"
                  value = {email}
                  onChange = {(e)=>setemail(e.target.value)}
                  className="pl-10 bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 text-white placeholder-gray-400" />
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  size={18} />
                <Input
                  type="password"
                  placeholder="Password"
                  value = {password}
                  onChange = {(e)=>setpassword(e.target.value)}
                  className="pl-10 bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 text-white placeholder-gray-400" />
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  size={18} />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value = {confirm_password}
                  onChange = {(e)=>setconfirm_password(e.target.value)}
                  className="pl-10 bg-gray-800 border-purple-500 focus:border-purple-400 focus:ring-purple-400 text-white placeholder-gray-400" />
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300" onClick={handlesignup}>
              Sign Up
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>)
  );
}

export default GlossyDarkAuthPage;