import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Chat() {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profilesetup){
      toast("Please setup Profile to continue");
      navigate("/profile")
    }
  },[userInfo, navigate]);


  return (
    <div>Chat</div>
  )
}

export default Chat