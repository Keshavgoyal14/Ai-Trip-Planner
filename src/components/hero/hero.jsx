import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from '../ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-60 mt-8 '>
        <h1 className='text-[56px] font-extrabold  '>Discover Your Next Trip with AI:</h1>
        <p className='text-[56px] text-red-500 font-extrabold text-center'>Personalised Itinaries at Your Fingertips</p>
        <p className='mt-5 text-[20px] font-bold '>Embark on unforgettable journeys—plan, explore, and experience the world with ease!</p>
        <Link to='/create-trip'><Button className='mt-4 cursor-pointer'>Get Started For Free</Button></Link>
    </div>
  )
}

export default Hero