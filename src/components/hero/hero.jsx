import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from '../ui/button'
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className='flex flex-col gap-2.5 text-center md:items-center  md:mx-60 md:mt-8  m-5 md:m-0 '>
        <h1 className='text-3xl md:text-[56px] font-extrabold dark:text-gray-300 '>Plan Your Perfect Trip with AI:</h1>
        <p className='text-3xl md:text-[56px] text-red-500 dark:text-red-400 font-extrabold text-center'>Smart, Personalized Itineraries in Seconds</p>
        <p className='mt-5 text-sm md:text-[20px] font-bold dark:text-gray-300  '>Explore dream destinations effortlessly—customized to your style, budget, and timeline.</p>
        <Link to='/create-trip'><Button className='mt-4 text-[12px] md:text-sm md:w-auto cursor-pointer dark:bg-gray-300 dark:font-bold transition ease-out '>Get Started <FaArrowRight /></Button></Link>
    </div>
  )
}

export default Hero
