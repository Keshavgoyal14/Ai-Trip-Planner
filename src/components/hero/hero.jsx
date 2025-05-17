import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from '../ui/button'
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-60 mt-8 '>
        <h1 className='text-[56px] font-extrabold dark:text-gray-300 '>Plan Your Perfect Trip with AI:</h1>
        <p className='text-[56px] text-red-500 dark:text-red-400 font-extrabold text-center'>Smart, Personalized Itineraries in Seconds</p>
        <p className='mt-5 text-[20px] font-bold dark:text-gray-300  '>Explore dream destinations effortlessly—customized to your style, budget, and timeline.</p>
        <Link to='/create-trip'><Button className='mt-4 cursor-pointer dark:bg-gray-300 dark:font-bold'>Get Started <FaArrowRight /></Button></Link>
    </div>
  )
}

export default Hero
