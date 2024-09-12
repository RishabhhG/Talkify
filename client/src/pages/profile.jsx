import { useAppStore } from '@/store'
import React from 'react'
import EnhancedProfilePage from '@/components/enhanced-profile-page'

function Profile() {
  const {userInfo} = useAppStore()
  return (
    <div>
       <EnhancedProfilePage/>
    </div>
  )
}

export default Profile