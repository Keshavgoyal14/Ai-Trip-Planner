import { useEffect, useState } from 'react'
import { GetPlacesDetails } from '../../service/GlobalApi'
import { Link } from 'react-router-dom'

function HotelRecommend({trip}) {
  const [photoURL, setPhotoUrl] = useState({});
  
  // Log when photoURL changes
 useEffect(() => {
  Object.entries(photoURL).forEach(([index, url]) => {
    console.log(`Photo URL for hotel at index ${index}:`, url);
  });
}, [photoURL]);
  
  useEffect(() => {
    if (trip?.Aitrips?.hotels) {
      trip.Aitrips.hotels.forEach((hotel,index) => {
      GetPhoto(hotel,index);
    })
  } },[trip]);
  
  const GetPhoto = async (hotel,index) => { 
    const data = {
      textQuery: `${hotel?.hotelName}, ${hotel?.hotelAddress}`,
    };
  
    const result = await GetPlacesDetails(data);
    console.log(result);
    const photoName = result?.places?.[0]?.photos?.[2]?.name;
  
    if (photoName) {
      const photoRef = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
      setPhotoUrl((prev) => ({ ...prev, [index]: photoRef }));
      
    } else {
      console.warn("No valid photo found.");
    }
  };
  return (
    <div className='m-5 font-bold '>
        <h2 className='ml-2 text-xl'>Hotel Recommendation</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
            {trip?.Aitrips?.hotels?.map((item,index)=>{
               
                return( <Link to={'https://www.google.com/maps/search/?api=1&query='+item?.hotelName+","+item?.hotelAddress} target="_blank">
                    <div key={index} className='flex flex-col gap-2 hover:shadow-2xl hover:border-blue-100 hover:border-2 rounded-xl '>
                        <img src={photoURL[index]} alt="Not found" className='w-[400px] height-[400px]'/>
                        <div className='flex flex-col  justify-between text-center text-xs'>
                            <h2 className='font-bold text-[16px]'>🛏️{item?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍{item?.hotelAddress}</h2>
                            <h2 className='font-medium'>💸{item?.price}</h2>
                            <h2>⭐{item?.rating}</h2>

                    </div></div></Link>
                )
            })}
        
    </div></div>
  )
}

export default HotelRecommend