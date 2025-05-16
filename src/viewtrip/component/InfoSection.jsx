import { useEffect, useState } from "react";
import { GetPlacesDetails } from "../../service/GlobalApi";
import { IoIosSend } from "react-icons/io";
import { FaFacebook,FaSquareXTwitter,FaInstagram } from "react-icons/fa6";
import { FaWhatsapp,FaLinkedinIn } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton,LinkedinShareButton,InstapaperShareButton} from "react-share"

// handleInfoPDF.js
export const handleInfoPDF = (doc, trip, y) => {
  doc.setFontSize(16);
  doc.text("Provided Trip Information", 10, y);
  y += 5;
  doc.setFontSize(12);
  doc.text(`Location: ${trip?.userSelection?.location }`, 10, y += 8);
  doc.text(`No of Days: ${trip?.userSelection?.NoOfDays}`, 10, y += 8);
  doc.text(`Budget: ${trip?.userSelection?.budget }`, 10, y += 8);
  doc.text(`No of Travelers: ${trip?.userSelection?.persons}`, 10, y += 8);

  return y;
};



const InfoSection = ({trip}) => {
  const [photoURL, setPhotoUrl] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
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
const shareUrl = window.location.href;
const title = `Check out this trip to ${trip?.userSelection?.location}!`;

  return (
    <div className='flex flex-col gap-4 m-5'>
      <img src={photoURL} alt="No image found" className="h-[340px] w-full object-cover rounded-2xl dark:border-gray-700 dark:border-2" />
      <div>
        <h2 className='font-bold ml-2 text-xl dark:text-gray-300'>{trip?.userSelection?.location}</h2>
        <div className='flex justify-between m-2 '>
            <div className='flex-col sm:flex sm:flex-row gap-2'>
          <h2 className='bg-gray-300 dark:text-gray-200 dark:bg-gray-500 rounded-xl m-2 p-2 font-medium text-xs md:text-[14px] '>📅{trip?.userSelection?.NoOfDays} Days</h2>
          <h2 className='bg-gray-300 dark:text-gray-200 dark:bg-gray-500 rounded-xl m-2 p-2 font-medium text-xs md:text-[14px]'>💰{trip?.userSelection?.budget} Budget</h2>
          <h2 className='bg-gray-300 dark:text-gray-200 dark:bg-gray-500 rounded-xl m-2 p-2 font-medium text-xs md:text-[14px]'>🧑🏻‍🤝‍🧑🏻No.of travelers: {trip?.userSelection?.persons}</h2>
       </div><div className='mr-5'> <button onClick={()=>setOpenDialog(true)}><IoIosSend  size={40} className='hover:cursor-pointer p-2 rounded-3xl bg-black text-white dark:bg-gray-200 dark:text-black' /></button></div>
        </div>
      </div>
     <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Share</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-10 p-2">
            <FacebookShareButton url={shareUrl} quote={title}>
              <button className="bg-blue-600 text-white p-2 rounded-lg w-full "><FaFacebook size={40}/></button>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <button className="bg-black text-white p-2 rounded-lg w-full"><FaSquareXTwitter size={40} /></button>
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <button className="bg-green-500 text-white p-2 rounded-lg w-full"><FaWhatsapp size={40}/></button>
            </WhatsappShareButton>
            <InstapaperShareButton url={shareUrl} title={title}>
              <button className="bg-pink-700 text-white p-2 rounded-lg w-full"><FaInstagram size={40}/></button>
            </InstapaperShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
              <button className="bg-blue-700 text-white p-2 rounded-lg w-full"><FaLinkedinIn size={40}/></button>
            </LinkedinShareButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    
  )
}

export default InfoSection;
