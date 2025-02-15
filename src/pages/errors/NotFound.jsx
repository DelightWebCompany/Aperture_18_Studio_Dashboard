import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='text-center mt-5'>
      <h1>404 Not Found</h1>
      <Link to={'/'}>Go back to home</Link>
    </div>
  )
}
