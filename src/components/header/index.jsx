import { Button } from '../ui/button'
import { useNavigate ,Link} from 'react-router-dom'
import { Switch } from "@/components/ui/switch"
import { useDarkMode } from '../DarkMode'
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
    <div className='w-full flex flex-col md:flex-row items-start gap-y-2 md:items-center md:justify-between p-4  mt-1 shadow-sm dark:text-gray-300 flex-wrap'>
     <h2 className='uppercase md:m-0 m-auto font-extrabold text-[20px] md:text-[28px] tracking-wide '>Trip<span className='text-red-600'>Mate</span></h2>
      {/* <img src='/logo.svg' alt="Image not Found" /> */}
      {user? <div className='flex gap-2 m-auto md:m-0'>
         <div className="flex flex-col md:flex-row w-full md:justify-end items-center gap-2 ">
      <Switch  checked={isdarkMode} onCheckedChange={handleToggle} />
      <span className=" text-[12px] text-center  md:text-sm text-gray-700 dark:text-gray-300">
        {isdarkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
        <span><Link to="/create-trip"><Button className='text-[12px] p-[0] md:text-sm md:p-2 ' variant='outline'>+ Create Trips</Button></Link></span>
        <span><Link to="/my-trips"> <Button className='text-[12px] p-[0] md:text-sm md:p-3' variant="outline">My Trips</Button></Link></span>
        <Popover className="relative">
          <PopoverTrigger><img src={userData?.picture} className="w-[35px] h-[35px] rounded-3xl" alt="no image found" /></PopoverTrigger>
          <PopoverContent><button onClick={() => handleLogout()}>Logout</button></PopoverContent>
        </Popover>
      </div> :
        <div><Button onClick={() => setOpenDialog(true)} className='cursor-pointer'>Sign In</Button></div>
      }
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

export default Header
