import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Otpverificationpage from './pages/OtpVerificationPage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/auth" element = {<Auth/>}/>
        <Route path="*" element={<Navigate to="/auth" replace />}/>
        <Route path="/chat" element = {<Chat/>}/>
        <Route path="/otp-verification" element = {<Otpverificationpage/>}/>
        <Route path="/profile" element = {<Profile/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
