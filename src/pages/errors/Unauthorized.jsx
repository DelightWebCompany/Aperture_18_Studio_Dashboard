import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className='text-center mt-5'>
      <h1>Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
      <Link to={'/'}>Go back to home</Link>
    </div>
  )
}
