import { useEffect, useState } from 'react'
import Autocomplete from "react-google-autocomplete";
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import main from './service/Aimodal';
import { Button } from "@/components/ui/button"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { SelectTravelPlans, SelectBudgetOption ,AI_PROMPT } from "@/constants/options"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { db } from './firebaseConfig'
import { setDoc, doc } from "firebase/firestore"; 

 const CreateTrip = () => {
        const navigate = useNavigate()
  const [place, setPlace] = useState('')
  const[loading,setLoading]=useState(false)
  const [formData,setformData]=useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const handleInputChange = (name, e) => {
    setformData({
      ...formData,
      [name]: e
    })
  }
  useEffect(()=>{
 console.log(formData)
  },[formData])

  const Generatetrip= async()=>{
     const user =localStorage.getItem('user')
     if(!user){
      setOpenDialog(true)
      return null
     }
    if(!formData.location||!formData.NoOfDays||!formData.budget||!formData.persons){
      toast("Please fill all the fields");
    return}
    if(formData?.NoOfDays>7){
      toast("Select a trip of 7 days or less");
      return
    }
    setLoading(true)
   const FINAL_PROMPT= AI_PROMPT
   .replace("{location}",formData.location)
   .replace("{days}",formData.NoOfDays) 
    .replace("{budget}",formData.budget)
    .replace("{travel}",formData.persons)
    .replace("{days}",formData.NoOfDays)
    console.log(FINAL_PROMPT)

  try {
    toast("Generating your travel plan...");
    const result = await main(FINAL_PROMPT);
    setLoading(false)
    SaveAitrip(result)
    return result;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    return null
  }
 };
 const SaveAitrip=async(tripdata)=>{
  setLoading(true)
  const user=JSON.parse(localStorage.getItem('user'))
  const docID=Date.now().toString()
  await setDoc(doc(db, "AiTrips", docID), {
    Aitrips:JSON.parse(tripdata),
    userSelection:formData,
    UserEmail:user?.email,
    id:docID
});
setLoading(false)
navigate(`/viewtrip/${docID}`)
 }
 const login = useGoogleLogin({
  onSuccess: tokenResponse => {console.log(tokenResponse)
    GetUserProfile(tokenResponse);
  },
  onError: error => console.log('Login Failed:', error),
 });
 const GetUserProfile = (tokenInfo) => {
  if (!tokenInfo?.access_token) {
    console.error("Access token is missing");
    return;
  }

  console.log(`Fetching user info with token: ${tokenInfo.access_token}`);

  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
    headers: {
      Authorization: `Bearer ${tokenInfo.access_token}`,
      Accept: 'application/json',
    },
  }).then((response) => {
    console.log("User Info:", response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    toast("Login Success");
    setOpenDialog(false);
  }).catch((error) => {
    console.error("Error fetching user info:", error.response?.data || error.message);
  });
};
  return (
  
    <div className='flex flex-col mx-9 mt-9 gap-2 m-10 dark:text-gray-300'>
      
      <h1 className='text-3xl font-medium dark:text-gray-300'>Tell us about Your travel preference</h1>
      <p className='text-xl font-medium text-gray-600 dark:text-gray-500'>Just provide the basic information and our trip planner generate customized trip based on your preference</p>

      <div className='flex flex-col gap-5 dark:text-gray-300 '>
        
        <h2 className='mx-9 text-[18px] mt-4 font-bold'>What is destination of choice?</h2>
        <Autocomplete
          className='w-[50%] p-2 ml-10 border-2 border-gray-300 rounded-md'
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          onPlaceSelected={(value) => {
            setPlace(value.formatted_address);
            handleInputChange("location",value.formatted_address);
            console.log(value.formatted_address);
          }}
          onChange={(e) =>{ setPlace(e.target.value);
           handleInputChange("location",e.target.value)}
          }
        />
        <div className='flex flex-col gap-5 font-bold '>
          <h2 className='mx-9 text-[18px] mt-4'>How many days are you planning Trip?</h2>
          <Input className='w-[50%] p-2 ml-10 border-2 border-gray-300 rounded-md' placeholder={'Ex-4'} type='number'
          onChange={(e)=>{const value = Number(e.target.value);
    if (value < 0) {
      toast("Number of days cannot be negative"); // Show a toast notification
      handleInputChange('NoOfDays', 0); // Reset to 0 or any default value
    } else {
      handleInputChange('NoOfDays', value); // Update with valid value
    }}} />
        </div>
        <div>
          <h2 className='mx-9 text-[18px] mt-4 font-bold my-5'>What is your Budget ?</h2>
          <div className='grid grid-cols-3 mt-4 ml-9'>
            {SelectBudgetOption().map((item) => {
              return (
              <div key={item.id} onClick={()=>handleInputChange('budget',item.title)} className={`flex flex-col m-5 items-center border-2  rounded-md p-4 hover:shadow-2xl ${formData.budget===item.title&&'shadow-2xl border-black border-2 dark:border-gray-300'}`}>
                <div className=''>{item.icon}</div>
                <div className='font-bold'>{item.title}</div>
                <div>{item.desc}</div>
              </div>)
            } )}
          </div>
        </div>
        
      </div>
      <div>
        <h2 className='mx-9 text-[18px] mt-4 font-bold'>What is your travel plan?</h2>
        <div className='grid grid-cols-3 mt-4 ml-9'>
          {SelectTravelPlans().map((item) => {
            return (
            <div key={item.id} onClick={()=>handleInputChange('persons',item.people)} className={`flex flex-col m-5 items-center border-2  rounded-md p-4 hover:shadow-2xl ${formData.persons===item.people&&'shadow-2xl border-black dark:border-gray-300 '}`}>
              <div className=''>{item.icon}</div>
              <div className='font-medium'>{item.title}</div>
              <div>{item.desc}</div>
            </div>)
          } )}
        </div>
      </div>
      <div className='flex justify-end'>
        <Button disabled={loading} onClick={()=>Generatetrip()} className=' bg-black text-white font-bold px-3 py-2 rounded-md hover:bg-red-600 hover-shadow-2xl dark:bg-gray-300 dark:text-black dark:hover:bg-red-400'>
        {loading?<AiOutlineLoading3Quarters className='animate-spin'/>:'Generate Trip'}</Button></div>

  <Dialog open={openDialog}> 
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Login In </DialogTitle>
      <DialogDescription>
        <h1 className='mt-3'>Sign In to App with Google Authentication securely</h1>
       <Button onClick={login} className="w-full mt-5">Sign In with Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
 </Dialog>

    </div>
    
  )
 }

export default CreateTrip