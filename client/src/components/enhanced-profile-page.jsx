'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, User, Users } from 'lucide-react'

export function EnhancedProfilePage() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [selectedColor, setSelectedColor] = useState('#FF1493')

  const colors = ['#FF1493', '#FFD700', '#00CED1', '#32CD32']

  return (
    (<div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div
        className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="p-2 hover:bg-gray-700 rounded-full transition-colors duration-300">
            <ArrowLeft className="h-6 w-6 text-gray-400" />
          </Button>
        </div>
        
        <div className="flex justify-center mb-8">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg"
            style={{ backgroundColor: selectedColor }}>
            <span className="text-5xl font-bold text-white">
              {firstName ? firstName[0].toUpperCase() : 'K'}
            </span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Email" />
          </div>
          
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="First Name" />
          </div>
          
          <div className="relative">
            <Users
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Last Name" />
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 my-8">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transform transition-all duration-300 hover:scale-110 ${color === selectedColor ? 'ring-2 ring-white' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}>
              {color === selectedColor && (
                <span className="flex items-center justify-center h-full text-white">✓</span>
              )}
            </button>
          ))}
        </div>
        
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Save Changes
        </Button>
      </div>
    </div>)
  );
}

export default EnhancedProfilePage;