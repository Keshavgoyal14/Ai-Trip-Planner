import { useEffect, useState } from 'react'
import Autocomplete from "react-google-autocomplete";
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import main from './service/Aimodal';
import { Button } from "@/components/ui/button"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate ,useLocation} from 'react-router-dom';
import { handlePayments } from './components/handlepayments';
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
import { setDoc, doc ,updateDoc,getDoc} from "firebase/firestore"; 

 const CreateTrip = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const edittrip = location.state?.editTrip
  const [place, setPlace] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setformData] = useState(edittrip ? edittrip.userSelection : {})
  const [openDialog, setOpenDialog] = useState(false)
 const GenerateLimit=2;
  const handleInputChange = (name, e) => {
    setformData({ ...formData, [name]: e })
  }

  useEffect(() => {
    if (edittrip) setformData(edittrip.userSelection);
  }, [edittrip]);

 const updateGenerateCount = async (userEmail) => {
    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    let count = 0;
    if (userSnap.exists()) {
      count = userSnap.data().generateCount || 0;
      await updateDoc(userRef, { generateCount: count + 1 });
    } else {
      await setDoc(userRef, { generateCount: 1 });
      count = 1;
    }
    return count + 1;
  };

  // Firestore: get current count
  const getGenerateCount = async (userEmail) => {
    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return {
      generateCount:data.generateCount || 0,
      isPaid: data.isPaid || false,
    };
  };
  const Generatetrip = async () => {
    const user =JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setOpenDialog(true)
      return null
    }
    if (!formData.location || !formData.NoOfDays || !formData.budget || !formData.persons) {
      toast("Please fill all the fields");
      return
    }
    if (formData?.NoOfDays > 7) {
      toast("Select a trip of 7 days or less");
      return
    }
    // Check generate count in Firestore
    const {generateCount,isPaid} = await getGenerateCount(user.email);
    if (!isPaid && currentCount >= GenerateLimit ) {
      toast(`You have reached the limit of ${GenerateLimit} trip generations. Please upgrade your plan.`);
      navigate('/pricing');
      return;
    }
    setLoading(true)
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData.location)
      .replace("{days}", formData.NoOfDays)
      .replace("{budget}", formData.budget)
      .replace("{travel}", formData.persons)
      .replace("{days}", formData.NoOfDays)

    try {
      toast("Generating your travel plan...");
      const result = await main(FINAL_PROMPT);
      setLoading(false)
      
      // Update generate count in Firestore (only for new trips)
      if (!edittrip) {
        await updateGenerateCount(user.email);
      }

      if (edittrip) {
        const tripRef = doc(db, "AiTrips", edittrip.id);
        await updateDoc(tripRef, {
          Aitrips: JSON.parse(result),
          userSelection: formData,
        })
        navigate(`/viewtrip/${edittrip.id}`)
      } else {
        SaveAitrip(result)
      }
      return result;
    } catch (error) {
      console.error("Error generating travel plan:", error);
      return null
    }
  };

  const SaveAitrip = async (tripdata) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docID = Date.now().toString()
    await setDoc(doc(db, "AiTrips", docID), {
      Aitrips: JSON.parse(tripdata),
      userSelection: formData,
      UserEmail: user?.email,
      id: docID
    });
    setLoading(false)
    navigate(`/viewtrip/${docID}`)
  }

  const login = useGoogleLogin({
    onSuccess: tokenResponse => GetUserProfile(tokenResponse),
    onError: error => console.log('Login Failed:', error),
  });

  const GetUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) return;
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      toast("Login Success");
      setOpenDialog(false);
    }).catch((error) => {
      console.error("Error fetching user info:", error.response?.data || error.message);
    });
  };

  const handleCancel = () => navigate('/my-trips')
 

  return (
    <div className='flex flex-col mx-4 md:mx-9 mt-5 md:mt-9 gap-2 m-5 dark:text-gray-300'>
      <h1 className='text-xl md:text-3xl font-medium dark:text-gray-300'>Tell us about Your travel preference</h1>
      <p className='text-sm md:text-xl font-medium text-gray-600 dark:text-gray-500'>Just provide the basic information and our trip planner generates a customized trip based on your preference</p>

      <div className='flex flex-col gap-5'>
        <h2 className='text-[16px] md:text-[18px] mt-4 font-bold mx-2 md:mx-9'>What is destination of choice?</h2>
        <Autocomplete
          className='w-full md:w-[50%] p-2 ml-0 md:ml-10 border-2 border-gray-300 rounded-md'
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          value={formData.location || ""}
          onPlaceSelected={(value) => {
            setPlace(value.formatted_address);
            handleInputChange("location", value.formatted_address);
          }}
          onChange={(e) => {
            setPlace(e.target.value);
            handleInputChange("location", e.target.value)
          }}
        />

        <div className='flex flex-col gap-5 font-bold'>
          <h2 className='text-[16px] md:text-[18px] mt-4 mx-2 md:mx-9'>How many days are you planning Trip?</h2>
          <Input
            className='w-full md:w-[50%] p-2 ml-0 md:ml-10 border-2 border-gray-300 rounded-md'
            placeholder='Ex-4' type='number'
            value={formData.NoOfDays || ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) {
                toast("Number of days cannot be negative");
                handleInputChange('NoOfDays', 0);
              } else {
                handleInputChange('NoOfDays', value);
              }
            }}
          />
        </div>

        <h2 className='text-[16px] md:text-[18px] mt-4 font-bold mx-2 md:mx-9'>What is your Budget ?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 ml-0 md:ml-9'>
          {SelectBudgetOption().map((item) => (
            <div key={item.id} onClick={() => handleInputChange('budget', item.title)}
              className={`flex flex-col items-center border-2 rounded-md p-4 hover:shadow-2xl ${formData.budget === item.title && 'shadow-2xl border-black dark:border-gray-300'}`}>
              <div>{item.icon}</div>
              <div className='font-bold'>{item.title}</div>
              <div>{item.desc}</div>
            </div>
          ))}
        </div>

        <h2 className='text-[16px] md:text-[18px] mt-4 font-bold mx-2 md:mx-9'>What is your travel plan?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 ml-0 md:ml-9'>
          {SelectTravelPlans().map((item) => (
            <div key={item.id} onClick={() => handleInputChange('persons', item.people)}
              className={`flex flex-col items-center border-2 rounded-md p-4 hover:shadow-2xl ${formData.persons === item.people && 'shadow-2xl border-black dark:border-gray-300'}`}>
              <div>{item.icon}</div>
              <div className='font-medium'>{item.title}</div>
              <div>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-3 justify-end items-center md:items-end mt-6'>
        <Button disabled={loading} onClick={Generatetrip}
          className='cursor-pointer bg-black text-white font-bold px-3 py-2 rounded-md hover:bg-red-600 hover-shadow-2xl dark:bg-gray-300 dark:text-black dark:hover:bg-red-400'>
          {loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Generate Trip'}
        </Button>
        {edittrip && (
          <Button onClick={handleCancel} className='bg-black text-white font-bold px-3 py-2 rounded-md hover:bg-red-600 hover-shadow-2xl dark:bg-gray-300 dark:text-black dark:hover:bg-red-400'>Cancel</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
