import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { handlePayments } from "../handlepayments";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState ,useEffect} from "react";
import { toast } from "sonner";
const Pricing = () => {
    const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();
 
const fetchPaid=async()=>
{const user = localStorage.getItem("user");
    const userdata= JSON.parse(user);
    if(!userdata || !userdata.email){
        return;
    }
    const userRef = doc(db, "users", userdata.email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      setIsPaid(data.isPaid);
    } else {
      console.error("User document does not exist");
    }
} 
 useEffect(()=>{
    fetchPaid();
  },[])
 return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-20 dark:text-gray-200">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Free Tier */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Free Tier</h2>
          <p className="text-4xl font-extrabold mb-2 text-green-600">₹0</p>
          <ul className="mb-6 text-gray-700 dark:text-gray-300">
            <li>✅ Generate up to <b>3 trips</b> for free</li>
            <li>✅ Access to basic AI trip planning</li>
            <li>✅ Edit and view your trips</li>
          </ul>
          <Button disabled={isPaid} onClick={() => navigate("/create-trip")}>Start for Free</Button>
        </div>
        {/* Paid Tier */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center border-2 border-red-500">
          <h2 className="text-xl font-bold mb-2 ">Pro Tier</h2>
          <p className="text-4xl font-extrabold mb-2 text-red-600">₹499 <span className="text-base font-normal text-gray-500">/ lifetime</span></p>
          <ul className="mb-6 text-gray-700 dark:text-gray-300">
            <li>🚀 <b>Unlimited</b> trip generations</li>
            <li>🚀 Priority AI processing</li>
            <li>🚀 Early access to new features</li>
          </ul>
          <Button  onClick={() =>{isPaid? toast("You are already subscribed!") : handlePayments()}}>{isPaid? "Subscribed" :"Upgrade Now"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;