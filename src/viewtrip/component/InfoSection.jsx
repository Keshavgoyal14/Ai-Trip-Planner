import { useEffect, useState } from "react";
import { GetPlacesDetails } from "../../service/GlobalApi";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({trip}) => {
  const [photoURL, setPhotoUrl] = useState('');

// Log when photoURL changes
useEffect(() => {
  if (photoURL) {
    console.log( photoURL);
  }
}, [photoURL]);

useEffect(() => {
  if (trip) {
    GetPhoto();
  }
}, [trip]);

const GetPhoto = async () => { 
  const data = {
    textQuery: trip?.userSelection?.location,
  };

  const result = await GetPlacesDetails(data);
  console.log(result);
  const photoName = result?.places?.[0]?.photos?.[3]?.name;

  if (photoName) {
    const photoRef = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=900&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
    setPhotoUrl(photoRef);
    
  } else {
    console.warn("No valid photo found.")
  }
}

  return (
    <div className='flex flex-col gap-4 m-5'>
      <img src={photoURL} alt="No image found" className="h-[340px] w-full object-cover rounded-2xl " />
      <div>
        <h2 className='font-bold ml-2 text-xl'>{trip?.userSelection?.location}</h2>
        <div className='flex justify-between m-2 '>
            <div className='flex-col sm:flex sm:flex-row gap-2'>
          <h2 className='bg-gray-300  rounded-xl m-2 p-2 font-medium text-xs md:text-[14px] '>📅{trip?.userSelection?.NoOfDays} Days</h2>
          <h2 className='bg-gray-300  rounded-xl m-2 p-2 font-medium text-xs md:text-[14px]'>💰{trip?.userSelection?.budget} Budget</h2>
          <h2 className='bg-gray-300  rounded-xl m-2 p-2 font-medium text-xs md:text-[14px]'>🧑🏻‍🤝‍🧑🏻No.of travelers: {trip?.userSelection?.persons}</h2>
       </div><div className='mr-5'> <button><IoIosSend style={{color:"white",background:"black"}} size={35} className='hover:cursor-pointer p-2 rounded-[3px]' /></button></div>
        </div>
      </div>
    </div>
    
  )
}

export default InfoSection