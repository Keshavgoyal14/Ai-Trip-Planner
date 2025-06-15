import { Button } from '../ui/button'
import { useNavigate ,Link} from 'react-router-dom'
import { Switch } from "@/components/ui/switch"
import { useDarkMode } from '../DarkMode'
import { db } from '../../firebaseConfig'
import { doc, getDoc, setDoc } from "firebase/firestore"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { toast } from "sonner"
const Header = () => {
  const { isdarkMode, setDarkMode } = useDarkMode()
   const handleToggle = (checked) => {
    setDarkMode(checked);
  };

  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const userData = JSON.parse(user)
 
  const getOrCreateUser = async (user) => {
  const userRef = doc(db, "users", user.email);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Create user with initial values
    await setDoc(userRef, {
      generateCount: 0,
      isPaid: false,
    });
    return { generateCount: 0, isPaid: false };
  } else {
    // Fetch and return existing values
    const data = userSnap.data();
    return {
      generateCount: data.generateCount || 0,
      isPaid: data.isPaid || false
    };
  }
};
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse)
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
      getOrCreateUser(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.error("Error fetching user info:", error.response?.data || error.message);
    });
  };

  const handleLogout = () => {
    googleLogout()
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()

  }
  return (
  <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between p-1 pb-5 md:p-4 md:mt-1 shadow-sm dark:text-gray-300 flex-wrap'>
  {/* First row (Title) — center on mobile, left on desktop */}
  <div className='w-full md:w-auto flex justify-center md:justify-start'>
   <Link to="/"> <h2 className='uppercase font-extrabold text-[28px] tracking-wide'>
      Trip<span className='text-red-600'>Mate</span>
    </h2></Link>
  </div>

  {/* Second row (Nav items) — center on mobile, right on desktop */}
  <div className='w-full md:w-auto flex flex-wrap justify-center md:justify-end gap-2 mt-2 md:mt-0'>
    {user ? (
      <>
        <div className="flex items-center gap-2">
          <Switch checked={isdarkMode} onCheckedChange={handleToggle} />
          <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
            {isdarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
         <Link to="/pricing">
          <Button className='text-xs md:text-sm px-2 md:px-4' variant='outline'>Pricing</Button>
        </Link>
        <Link to="/create-trip">
          <Button className='text-xs md:text-sm px-2 md:px-4' variant='outline'>+ Create Trips</Button>
        </Link>
        <Link to="/my-trips">
          <Button className='text-xs md:text-sm px-2 md:px-4' variant="outline">My Trips</Button>
        </Link>
        <Popover>
          <PopoverTrigger>
            <img src={userData?.picture} className="w-[32px] h-[32px] rounded-full cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <button onClick={handleLogout}>Logout</button>
          </PopoverContent>
        </Popover>
      </>
    ) : (
      <Button onClick={() => setOpenDialog(true)} className='text-xs md:text-sm'>Sign In</Button>
    )}
  </div>

  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Login In</DialogTitle>
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

export default Header
